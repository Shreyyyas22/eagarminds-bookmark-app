# EagerMinds Bookmarks

A personal bookmarks app: sign up, save private links, and share selected public bookmarks from a unique handle.

**Live URL:** pending Vercel deployment  
**GitHub:** pending remote URL

## Features

- Email/password auth with Supabase Auth
- Unique lowercase `@handle` profiles
- Welcome email via Resend
- Protected dashboard for bookmark CRUD
- Public profile route at `/@handle`
- Supabase RLS policies for profile/bookmark ownership

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Copy the env template:

```bash
cp .env.example .env.local
```

3. Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. In Supabase SQL Editor, run:

```bash
supabase/schema.sql
```

5. Start the app:

```bash
npm run dev
```

6. Open http://localhost:3000.

## Supabase Setup

- Enable the schema and RLS policies from `supabase/schema.sql`.
- In Authentication settings, set the local Site URL to `http://localhost:3000`.
- Add `http://localhost:3000/auth/callback` as an allowed redirect URL.
- For production, add the Vercel URL and `/auth/callback` redirect URL too.

## Deploy

Deploy with Vercel after pushing the repo to GitHub. Set these environment variables in Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
NEXT_PUBLIC_APP_URL
```

Then update Supabase Authentication URL Configuration with the deployed Vercel URL.

## Agent Sessions

Entire CLI is enabled in this repo for Codex, Cursor, and Antigravity, and created the `entire/checkpoints/v1` branch locally. After adding a GitHub remote, verify session sync with:

```bash
entire status
```

## Where the AI Agent Got It Wrong

The first version of the email helper called `new Resend()` at the top of the file, so the build would crash whenever `RESEND_API_KEY` wasn't set locally. I only caught it by running `npm run build` and saw it fail while collecting page data for `/dashboard`. Fixed it by moving `new Resend()` inside the `sendWelcomeEmail` function so it only runs when actually needed.

TypeScript also flagged that `useFormState` in the auth forms was getting an empty object as initial state without a proper type — it expected `ActionState`. Added a typed `const initialState: ActionState = {}` and it stopped complaining.

## What I'd Improve With More Time

I would add bookmark tags and filtering, fetch page titles automatically when a URL is pasted, and add rate limiting around handle checks and public profile reads.
