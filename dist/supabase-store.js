// Shared storage for identity web profiles.
//
// The app was originally a single-device tool backed by localStorage. This
// layer keeps that behaviour as an offline mirror and adds a Supabase table so
// every CA sees the same department-wide network. localStorage stays the
// fallback whenever the network or Supabase is unavailable.
(() => {
  'use strict';

  const table = 'profiles';
  const config = window.IDENTITY_WEB_CONFIG || {};
  const listeners = new Set();

  // Profiles that failed to reach Supabase. Local copies of these win over
  // whatever the server last saw, so an offline save is never silently lost.
  const pending = new Set();

  let client = null;
  let cache = [];
  let status = 'offline';

  function normalizeEmail(email) { return String(email || '').trim().toLowerCase(); }

  function toProfile(row) {
    return {
      firstName: row.first_name || '',
      lastName: row.last_name || '',
      email: row.email,
      instructor: row.instructor || '',
      community: row.community || '',
      identities: Array.isArray(row.identities) ? row.identities : [],
      deepenedIds: Array.isArray(row.deepened_ids) ? row.deepened_ids : []
    };
  }

  function toRow(profile) {
    return {
      email: normalizeEmail(profile.email),
      first_name: profile.firstName || '',
      last_name: profile.lastName || '',
      instructor: profile.instructor || '',
      community: profile.community || '',
      identities: profile.identities || [],
      deepened_ids: profile.deepenedIds || []
    };
  }

  function notify() { listeners.forEach(listener => { try { listener(); } catch { /* a bad listener must not break the rest */ } }); }

  function setStatus(next) {
    if (status === next) return;
    status = next;
    notify();
  }

  if (config.url && config.publishableKey && window.supabase?.createClient) {
    client = window.supabase.createClient(config.url, config.publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }

  async function refresh() {
    if (!client) return cache;
    try {
      const { data, error } = await client.from(table).select('*');
      if (error) throw error;
      cache = (data || []).map(toProfile);
      setStatus('online');
      notify();
    } catch (error) {
      console.warn('Identity Web: could not load shared profiles.', error);
      setStatus('offline');
    }
    return cache;
  }

  async function save(profile) {
    const email = normalizeEmail(profile.email);
    if (!client) { pending.add(email); return false; }
    try {
      const { error } = await client.from(table).upsert(toRow(profile), { onConflict: 'email' });
      if (error) throw error;
      pending.delete(email);
      // Reflect the write immediately so the shared views update without a
      // round trip, then reconcile with whatever the server actually stored.
      cache = cache.filter(item => normalizeEmail(item.email) !== email).concat([profile]);
      setStatus('online');
      notify();
      refresh();
      return true;
    } catch (error) {
      console.warn('Identity Web: saved locally, but could not sync to Supabase.', error);
      pending.add(email);
      setStatus('offline');
      return false;
    }
  }

  function subscribeToChanges() {
    if (!client) return;
    client.channel('identity-web-profiles')
      .on('postgres_changes', { event: '*', schema: 'public', table }, () => refresh())
      .subscribe();
  }

  window.IdentityWebStore = {
    enabled: Boolean(client),
    profiles() { return cache; },
    isPending(email) { return pending.has(normalizeEmail(email)); },
    status() { return status; },
    onChange(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    refresh,
    save,
    start() {
      if (!client) return Promise.resolve([]);
      subscribeToChanges();
      return refresh();
    }
  };
})();
