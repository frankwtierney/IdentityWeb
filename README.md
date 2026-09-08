# ELP 496 Identity Web

A browser tool for the ELP 496 identity and values assessment. Participants build
an identity ring, then explore where their experiences connect with other CAs
across Campus Living.

## Running it live

The front end is static and ships from `dist/`. Profiles are stored in a shared
Supabase table so everyone sees the same department-wide network.

- **Front end:** https://identityweb.leep.life, served by GitHub Pages and
  deployed by `.github/workflows/pages.yml` on every push to `main`. The custom
  domain lives in `dist/CNAME` so it survives redeploys.
- **Backend:** Supabase project `IdentityWeb` (`tdrytmpcbmqkzjuxcnga`, us-east-2).
  Schema lives in `supabase/migrations/`.

### GitHub Pages setup

The workflow enables Pages itself (`enablement: true` on `configure-pages`), so
a fresh clone of this repo needs no manual setup. If a deploy ever fails with
"Get Pages site failed", set **Settings → Pages → Source** to **GitHub Actions**
and re-run the workflow.

DNS: `identityweb.leep.life` points at GitHub's Pages addresses
(185.199.108–111.153).

## How storage works

`dist/supabase-store.js` is the storage layer. It keeps a local mirror in
`localStorage` and syncs to Supabase:

- On load, profiles are fetched and the views re-render as they arrive. The
  assessment itself works before that call returns, so a slow or failed network
  never blocks a participant.
- On save, the profile is written to `localStorage` first and then upserted to
  Supabase. If that upsert fails, the profile is marked pending and the local
  copy keeps winning until it syncs, so nothing is lost offline.
- A realtime subscription re-renders the network views when anyone else submits.

The demo cohort in `dist/app.js` (`seedProfiles`) is unchanged and still renders
alongside real submissions.

## Instructor access

Instructors sign in on the same screen with their UB email. The app recognises
them from `instructorAccounts` in `dist/app.js` and skips the assessment: they
get a read-only stand-in profile, never a row in Supabase.

What they see:

- **Department Web** — the full network, opening on their own CAs when they have
  a section. Tapping a CA opens that person's focused web; tapping a connection
  line compares two CAs.
- **Explore** — every identity present across the CAs in scope, with counts,
  linking through to everyone connected by it.

`My Web` and `My Ring` are replaced, since an instructor has no ring of their
own. Three accounts (Brian Haggerty, Chris Bragdon, Meegan Hunt) have no section
of CAs, so their class filter is hidden and they see the whole department.

To add or remove an instructor, edit `instructorAccounts` and redeploy. The
`section` value must match the instructor name CAs pick on their own profile.

## A note on access

There is no sign-in. Anyone with the URL can read every profile and can open or
overwrite a profile by typing that person's email. Given the data collected
(race, sexual orientation, religion, disability, and more), treat the Pages URL
as sensitive: share it with the class, not publicly.

The row level security policies allow read, insert, and update from the browser,
but not delete, so a stray request cannot drop someone's work.

If this needs to be locked down later, the change is to enable Supabase Auth
email magic links restricted to `@buffalo.edu` and narrow the update policy to
`auth.jwt() ->> 'email' = email`.
