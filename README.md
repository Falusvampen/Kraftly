[![CI](https://github.com/Falusvampen/Kraftly/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Falusvampen/Kraftly/actions/workflows/ci.yml)

# Kraftly Mina Sidor

Kundportal för Kraftlys kunder. Projektet är utvecklat av Webbmakarna AB 2026-06-30
för Team Volt, hösten 2026.

## Innehåll

- Dashboard med aktuell förbrukning
- Fakturaöversikt
- Profil och kunduppgifter
- Flyttanmälan
- Mock API för lokal utveckling

## Kom igång

### Förutsättningar

- **För Docker:** Docker och Docker Compose installerat.
- **Utan Docker:** Node.js 20 eller senare samt npm.

### 1. Med Docker (rekommenderat)

Starta hela miljön (både frontend och mock-API) i isolerade containrar:

```bash
docker compose up --build
```

Frontend: Öppna portalen på http://localhost:8080/.

Mock-API: Trafik proxas automatiskt via Nginx till /api/ (ingen separat port behöver öppnas).

För att stoppa miljön: tryck Ctrl+C eller kör docker compose down.

### Utan Docker (lokal utveckling)

Byt ut innehållet i example.env till deras korrekta värden och namnge filen till .env

Installera projektets dependencies och starta både frontend och mock API:

```bash
npm install
npm run start
```

Öppna sedan portalen på <http://localhost:5173/>.
Mock API körs på <http://localhost:4000/>.

## Tillgängliga kommandon

| Kommando                    | Beskrivning                                              |
| --------------------------- | -------------------------------------------------------- |
| `docker compose up --build` | Förhandsvisar produktionsbygget lokalt.                  |
| `npm run start`             | Startar Vite och mock API samtidigt.                     |
| `npm run dev`               | Startar endast Vites utvecklingsserver.                  |
| `npm run api`               | Startar endast mock API.                                 |
| `npm run build`             | Bygger frontend för produktion.                          |
| `npm run preview`           | Förhandsvisar produktionsbygget lokalt.                  |
| `npm run lint`              | Kör ESLint för att kontrollera kodkvaliteten.            |
| `npm run test:run`          | Kör enhetstesterna en gång med Vitest.                   |
| `npm run e2e:ci`            | Kör end-to-end-tester mot produktionsbygget med Cypress. |

## Teknik

- Vue 3
- Vite
- Vue Router
- Pinia
- Chart.js
- Express
- Nginx (i produktion/Docker)
- Docker & Docker Compose
- Github Actions

## Team och arbetssätt

### Möten

Ordinarie möten hålls på måndagar, tisdagar och fredagar klockan 10.00.

### Kommunikation

Slack används för skriftlig kommunikation och möten. Officiella beslut fattas
på möten och inte i direktmeddelanden.

### Definition of done

- Koden ska vara testad av minst en granskare, gärna två.
- Granskningen ska omfatta körning och testning, inte bara läsning av koden.
- Relevanta enhetstester ska finnas.
- Kodfrågor och kommentarer ska vara sakliga, artiga och respektfulla.
- Dokumentationen ska uppdateras när det behövs.

### Tekniskt ansvar

Tech lead: Louise M4-
Tech lead: Tom M0-M3

Om något skaver tar vi upp det tidigt i Slack och ber om hjälp vid behov.

## Lint regler

**I konfigurationsfilen för ESLint `eslint.config.mjs` är följande bestämt:**

- Bortglömda `console.log` och `alert` varnar bara. De kan inte orsaka buggar och är inte prio 1. Det är teknisk skuld som kan städas upp när tid finns.
- Variabler med `var` och jämförelser med `==` istället för `===` är errors. De kan orsaka buggar och varken ska eller behöver finnas i koden.
- Vue komponenter behöver inte innehålla minst två ord, det är inte nödvändigt och kan överkomplicera komponentnamn som kan beskrivas med ett ord.
