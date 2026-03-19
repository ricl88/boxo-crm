# BOXO CRM

Annonseadministrasjonssystem for BOXO.

## Oppsett

### 1. Supabase

1. Gå til [supabase.com](https://supabase.com) og opprett en konto
2. Opprett et nytt prosjekt (velg region nær Norge, f.eks. Frankfurt)
3. Gå til **SQL Editor** og kjør innholdet i `supabase-schema.sql`
4. Gå til **Settings > API** og kopier:
   - Project URL
   - anon/public key

### 2. Miljøvariabler

Opprett en fil `.env.local` i prosjektmappen:

```
NEXT_PUBLIC_SUPABASE_URL=din-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din-anon-key
```

### 3. Kjør lokalt

```bash
npm install
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000)

### 4. Deploy til Vercel

1. Push koden til GitHub
2. Gå til [vercel.com](https://vercel.com) og importer repoet
3. Legg til miljøvariablene i Vercel-dashboardet
4. Deploy!

## Funksjonalitet

- **Mine oppgaver**: Se og fullfør oppgaver tildelt deg
- **Bestill annonse**: Opprett video-, bilde- eller arbeidsoppgaver
- **Bibliotek**: Se alle ferdige annonser med filter
- **Produkter**: Se alle 137 produkter med Shopify-bilder
- **Settings**: Bytt bruker, administrer tillatelser og produkter

## Team

- Richard (Manager)
- Josefin (Campaign Manager)  
- Malin (Photo/Content)
- Caroline (Product Development)
- Allana (Video Editing)
- VA 1 & VA 2 (Customer Service)
