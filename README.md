# Legal Document Automation

MVP web app for lawyers: upload document templates with placeholders, manage client profiles, and generate filled documents for review and export.

## Features

- **Templates**: Upload or paste .txt templates with `{{placeholder_name}}` placeholders; placeholders are detected automatically.
- **Clients**: Create and manage client profiles (name, email, phone, address, etc.) that map to placeholders.
- **Generate**: Select a template and client to generate a document; placeholders are replaced with client data (plus `effective_date`).
- **Preview & edit**: Review and edit the generated document, then save or export as .txt.

## Tech stack

- **Next.js 14** (App Router)
- **React 18**, **TypeScript**
- **Tailwind CSS**
- **Supabase** (PostgreSQL)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Supabase**

   - Create a project at [supabase.com](https://supabase.com).
   - In the SQL Editor, run the contents of `supabase/schema.sql` to create tables.

3. **Environment**

   - Copy `.env.local.example` to `.env.local`.
   - Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your Supabase project settings.

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Folder structure

- `src/app/` – App Router pages and API routes.
- `src/components/` – Reusable UI (Layout, ClientForm, DocumentPreview, etc.).
- `src/lib/` – Supabase client, placeholder parsing (`placeholders.ts`), replacement engine (`replacement.ts`).
- `supabase/schema.sql` – Database schema.
- `docs/FOLDER_STRUCTURE.md` – Detailed folder and file list.

## Placeholders

Use double curly braces in templates, e.g.:

- `{{client_name}}`, `{{client_email}}`, `{{client_phone}}`
- `{{client_address}}`, `{{client_city}}`, `{{client_state}}`, `{{client_postal_code}}`, `{{client_country}}`
- `{{effective_date}}` (defaults to today when generating)

Client profile fields map to these keys; custom placeholders can be stored in `extra_fields` or filled via the generate flow later.

## License

MIT.
