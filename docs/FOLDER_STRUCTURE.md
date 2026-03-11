# Legal Document Automation – Folder Structure

```
Legal Document Automation/
├── docs/
│   └── FOLDER_STRUCTURE.md       # This file
├── supabase/
│   └── schema.sql               # Database schema (run in Supabase SQL Editor)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home / dashboard
│   │   ├── globals.css          # Global styles
│   │   ├── templates/
│   │   │   ├── page.tsx         # List templates
│   │   │   └── new/
│   │   │       └── page.tsx     # Upload new template
│   │   ├── clients/
│   │   │   ├── page.tsx         # List clients
│   │   │   └── new/
│   │   │       └── page.tsx     # New client form
│   │   ├── generate/
│   │   │   └── page.tsx         # Select template + client, generate doc
│   │   ├── documents/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Preview/edit generated document
│   │   └── api/
│   │       ├── templates/
│   │       │   ├── route.ts     # GET list, POST create
│   │       │   └── [id]/
│   │       │       └── route.ts # GET one, PATCH, DELETE
│   │       ├── clients/
│   │       │   ├── route.ts     # GET list, POST create
│   │       │   └── [id]/
│   │       │       └── route.ts # GET one, PATCH, DELETE
│   │       └── documents/
│   │           ├── route.ts    # GET list, POST create
│   │           └── [id]/
│   │               └── route.ts # GET one, PATCH (content), DELETE
│   ├── components/
│   │   ├── Layout.tsx          # App shell, nav
│   │   ├── TemplateCard.tsx    # Template list item
│   │   ├── ClientForm.tsx      # Client input form (reusable)
│   │   ├── DocumentPreview.tsx # Preview + edit generated doc
│   │   └── PlaceholderForm.tsx # Dynamic form from placeholders
│   └── lib/
│   ├── supabase.ts             # Supabase client
│   ├── placeholders.ts         # Parse {{placeholder}} from text
│   └── replacement.ts         # Replace placeholders with values
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── .env.local.example          # Supabase URL + anon key
```

## Responsibilities

- **`lib/placeholders.ts`** – Detect `{{key}}` placeholders in template content; return unique list.
- **`lib/replacement.ts`** – Take template content + key-value map; return final text (and optional preview).
- **`lib/supabase.ts`** – Browser/server Supabase client.
- **API routes** – CRUD for templates, client_profiles, generated_documents; template upload parses content and extracts placeholders.
- **Pages** – Dashboard (home), templates list/new, clients list/new, generate (template + client → create document), documents/[id] (preview/edit/export).
