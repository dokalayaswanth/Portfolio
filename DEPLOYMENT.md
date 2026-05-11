# Portfolio: setup and deployment

This app is a Vite + React SPA that reads all portfolio content from Supabase. You edit rows in the Supabase Table Editor; the site has no hardcoded resume data.

## 1. Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Supabase project (step 2), then copy environment variables:

   ```bash
   copy .env.example .env
   ```

   On macOS/Linux use `cp .env.example .env`. Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Production build (same as Vercel):

   ```bash
   npm run build
   npm run preview
   ```

## 2. Supabase setup

1. Create a project at [https://supabase.com](https://supabase.com).
2. Open **SQL Editor** → **New query**.
3. Paste the contents of `supabase/schema.sql` and run it. This creates:
   - `site_profile` — one row for name, tagline, email, social links, résumé URL
   - `skills` — name, category, proficiency (0–100), icon (text/emoji)
   - `projects` — title, description, `tech_stack` (array of strings), links, optional `image_url`, **`featured`** (boolean; highlights top work in the UI)
   - `experience` — role, company, description, `start_date`, optional `end_date` (null = Present)

   **Existing project from an older schema?** Run `supabase/patch_projects_featured.sql`, then load data with `supabase/seed_yaswanth_data.sql` (replaces all rows) or edit tables manually.
4. Confirm **Authentication → Policies**: tables use RLS with **public read** `SELECT` only. You manage data in the **Table Editor** (uses the service role and bypasses RLS for admins).
5. Optional: remove or edit the sample `INSERT` statements at the bottom of `schema.sql` before running, if you want an empty database.

### Content tips

- **Sort order**: use `sort_order` ascending for skills, projects, and experience.
- **Tech filter**: project filters are built from unique values in `tech_stack`.
- **Images**: set `image_url` to any HTTPS image URL (for example Supabase Storage public URL). The UI uses `loading="lazy"` and `decoding="async"`.

## 3. Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | **Project Settings → API → Project URL** |
| `VITE_SUPABASE_ANON_KEY` | **Project Settings → API → Project API keys → anon public** |

Never commit `.env`. The anon key is safe for browser use when RLS only allows `SELECT` for public data.

## 4. Deploy to Vercel

1. Confirm locally: `npm run build` exits with code 0.
2. Push this repository to GitHub (or GitLab/Bitbucket).
3. In [Vercel](https://vercel.com), **Add New Project** and import the repo.
4. Framework preset: **Vite** (or “Other” with **Build Command** `npm run build` and **Output Directory** `dist`).
5. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy, then open the production URL and confirm skills, projects, and experience load from Supabase.

### SPA routing

This project is a single page (`/`). No extra Vercel rewrites are required. If you later add client-side routes, add a `vercel.json` rewrite to `index.html`.

## 5. Troubleshooting

- **Blank sections**: check Table Editor for data and `sort_order`.
- **Failed to load / RLS**: ensure the four `Allow public read …` policies exist and migrations ran successfully.
- **CORS / wrong URL**: `VITE_SUPABASE_URL` must match your project URL exactly (including `https://`).
