# ELP 496 Identity Web

A browser tool for the ELP 496 identity and values assessment. Participants build
an identity ring, then explore where their experiences connect with other CAs
across Campus Living.

## Running it live

The front end is static and ships from `dist/`. Profiles are stored in a shared
Supabase table so everyone sees the same department-wide network.

- **Front end:** GitHub Pages, deployed by `.github/workflows/pages.yml` on every
  push to `main`.
- **Backend:** Supabase project `IdentityWeb` (`tdrytmpcbmqkzjuxcnga`, us-east-2).
  Schema lives in `supabase/migrations/`.

### First-time GitHub Pages setup

In the repository, go to **Settings → Pages** and set **Source** to
**GitHub Actions**. The next push to `main` publishes the site.

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
