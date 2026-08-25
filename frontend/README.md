# Frontend — Football Results

React web aplikacija za prikaz rezultata i sastava momčadi, izgrađena s Vite + TypeScript + MUI.

## Tech Stack

| Tehnologija | Verzija | Namjena |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool / dev server |
| TypeScript | 5 | Type safety |
| MUI (Material UI) | 7 | Komponente i dizajn sustav |
| Redux Toolkit | 2 | Globalni state management |
| React Router | 7 | Klijentski routing |
| Sass | 1 | CSS predprocesor |
| Day.js | 1 | Rad s datumima |

## Pokretanje lokalno

```bash
# iz korijena projekta
cd frontend

# instalacija ovisnosti (koristi package-lock.json)
npm ci

# pokretanje razvojnog servera (http://localhost:5173)
npm run dev
```

## Dostupne skripte

| Skripta | Opis |
|---|---|
| `npm run dev` | Pokreće Vite dev server s HMR-om |
| `npm run build` | `tsc -b` + Vite produkcijski build → `dist/` |
| `npm run lint` | ESLint provjera cijelog projekta |
| `npm run preview` | Lokalni preview produkcijskog builda |

## Environment varijable

| Datoteka | Koristi se za |
|---|---|
| `.env.development` | Lokalni razvoj (`npm run dev`) |
| `.env.production` | Produkcijski build (`npm run build`) |

## Struktura projekta

```
frontend/
├── src/
│   ├── components/    # Dijeljene UI komponente
│   ├── pages/         # Route komponente (stranice)
│   ├── redux/         # Redux store i slices
│   ├── services/      # API pozivi (fetch)
│   ├── types/         # TypeScript tipovi i sučelja
│   └── main.tsx       # Entry point
├── public/            # Statički aseti
├── index.html         # HTML predložak
├── vite.config.ts     # Vite konfiguracija
├── tsconfig.json      # TypeScript konfiguracija (root)
├── tsconfig.app.json  # TypeScript konfiguracija (app)
├── eslint.config.js   # ESLint konfiguracija
└── .nvmrc             # Zahtijevana Node.js verzija (v24.14.0)
```

## CI

Na svakom Pull Requestu prema `main` GitHub Actions automatski pokreće:

```
npm ci → npm run lint → tsc -b --noEmit → npm run build
```

Merge je blokiran dok svi koraci ne prođu. ✅

## Deployment

Deployana kao **Static Site** na [Render](https://render.com):

- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
