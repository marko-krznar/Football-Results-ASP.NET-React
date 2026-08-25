# Backend — Football Results API

ASP.NET Core 10 Web API za upravljanje podacima o utakmicama, igračima, momčadima i sezonama.

## Tech Stack

| Tehnologija | Verzija | Namjena |
|---|---|---|
| ASP.NET Core | 10 | Web API framework |
| Entity Framework Core | 10 | ORM / migracije |
| PostgreSQL | — | Relacijska baza podataka |
| ASP.NET Core Identity | 10 | Autentifikacija i uloge |
| Serilog | 10 | Strukturirano logiranje |
| Mapster | 10 | Object mapping (DTO ↔ Entity) |
| FluentValidation | 11 | Validacija ulaznih podataka |
| Scalar | 2 | API dokumentacija (OpenAPI UI) |
| dotenv.net | 4 | Učitavanje `.env` datoteke |

## Pokretanje lokalno

### Preduvjeti

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- PostgreSQL instanca (lokalna ili remote)

### Postavljanje

1. Kopirajte `.env` datoteku i popunite varijable:

```bash
cp .env .env.local
```

Potrebne varijable:

```env
ConnectionStrings__DefaultConnection=Host=localhost;Database=football;Username=postgres;Password=yourpassword
```

2. Pokrenite migracije i aplikaciju:

```bash
cd backend

dotnet restore
dotnet run
```

Aplikacija automatski pokreće `db.Database.Migrate()` pri startu — migracije se primjenjuju automatski.

## Dostupni endpointi

| Prefix | Controller | Opis |
|---|---|---|
| `/api/matches` | `MatchesController` | Upravljanje utakmicama |
| `/api/matchplayers` | `MatchPlayersController` | Igrači po utakmici |
| `/api/players` | `PlayersController` | Upravljanje igračima |
| `/api/teams` | `TeamsController` | Upravljanje momčadima |
| `/api/teammembers` | `TeamMembersController` | Članovi momčadi |
| `/api/seasons` | `SeasonsController` | Upravljanje sezonama |
| `/api/sets` | `SetsController` | Upravljanje setovima |
| `/api/roles` | `RolesController` | Upravljanje ulogama |
| `/auth/*` | ASP.NET Identity | Registracija, login, logout |
| `/healthz` | — | Health check (EF DB provjera) |

## API dokumentacija

U razvojnom okruženju dostupna je interaktivna API dokumentacija:

```
http://localhost:<port>/scalar
```

Scalar UI se učitava automatski iz OpenAPI specifikacije.

## Arhitektura

```
backend/
├── Controllers/       # HTTP endpointi (thin layer, bez logike)
├── Services/          # Poslovna logika (interface + implementacija)
│   ├── I*Service.cs   # Sučelja servisa
│   └── *Service.cs    # Implementacije servisa
├── Entities/          # EF Core entiteti (baza podataka)
├── Models/            # DTO modeli (request/response)
├── Data/              # AppDbContext + konfiguracija
├── Migrations/        # EF Core migracije
├── Middleware/        # GlobalExceptionHandler
├── Program.cs         # Composition root (DI, middleware pipeline)
└── backend.csproj     # Projektna datoteka
```

## CORS

Backend dopušta zahtjeve s:

- `http://localhost:5173` (lokalni Vite dev server)
- `https://localhost:5173`
- `https://react-football-results.onrender.com` (produkcijski frontend)

## CI

Na svakom Pull Requestu prema `main` GitHub Actions automatski pokreće:

```
dotnet restore → dotnet build --configuration Release
```

Merge je blokiran dok build ne prođe. ✅

## Deployment

Deployan kao **Docker Web Service** na [Render](https://render.com) putem `Dockerfile` u korijenu projekta.

- **Health check:** `/healthz`
- **Plan:** Free
