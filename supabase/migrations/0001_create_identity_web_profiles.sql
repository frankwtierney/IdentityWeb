-- Shared storage for ELP 496 Identity Web profiles.
-- One row per participant, keyed by UB email. Identity selections are stored as
-- JSON so the shape matches what the browser app already works with.

create table if not exists public.profiles (
  email text primary key check (email = lower(email) and email like '%@buffalo.edu'),
  first_name text not null default '',
  last_name text not null default '',
  instructor text not null default '',
  community text not null default '',
  identities jsonb not null default '[]'::jsonb,
  deepened_ids jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint identities_is_array check (jsonb_typeof(identities) = 'array'),
  constraint deepened_ids_is_array check (jsonb_typeof(deepened_ids) = 'array'),
  constraint identities_size check (pg_column_size(identities) < 65536)
);

comment on table public.profiles is 'ELP 496 Identity Web participant profiles. One row per UB email. Contains self-reported identity data; no authentication - access is controlled by keeping the app URL private.';

create index if not exists profiles_community_idx on public.profiles (community);
create index if not exists profiles_instructor_idx on public.profiles (instructor);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  new.created_at = coalesce(old.created_at, new.created_at, now());
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from public, anon, authenticated;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- The app has no sign-in, so the anon role carries the whole class. Reads and
-- writes are open, deletes are not: a stray request can never drop someone's
-- work, and recovery stays a deliberate action taken from the dashboard.
alter table public.profiles enable row level security;

drop policy if exists "anon read profiles" on public.profiles;
create policy "anon read profiles" on public.profiles
  for select to anon, authenticated using (true);

drop policy if exists "anon insert profiles" on public.profiles;
create policy "anon insert profiles" on public.profiles
  for insert to anon, authenticated with check (true);

drop policy if exists "anon update profiles" on public.profiles;
create policy "anon update profiles" on public.profiles
  for update to anon, authenticated using (true) with check (true);

revoke delete on public.profiles from anon, authenticated;

-- Push changes to connected browsers so the network views update live.
alter publication supabase_realtime add table public.profiles;
