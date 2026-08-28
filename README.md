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

- Node.js 20 eller senare
- npm

### Installation och start

Byt ut innehållet i example.env till deras korrekta värden och namnge filen till .env

Installera projektets dependencies och starta både frontend och mock API:

```bash
npm install
npm run start
```

Öppna sedan portalen på <http://localhost:5173/>.
Mock API körs på <http://localhost:4000/>.

## Tillgängliga kommandon

| Kommando          | Beskrivning                             |
| ----------------- | --------------------------------------- |
| `npm run start`   | Startar Vite och mock API samtidigt.    |
| `npm run dev`     | Startar endast Vites utvecklingsserver. |
| `npm run api`     | Startar endast mock API.                |
| `npm run build`   | Bygger frontend för produktion.         |
| `npm run preview` | Förhandsvisar produktionsbygget lokalt. |

## Teknik

- Vue 3
- Vite
- Vue Router
- Pinia
- Chart.js
- Express

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

Tech lead: Tom

Om något skaver tar vi upp det tidigt i Slack och ber om hjälp vid behov.

## Lint regler

**I konfigurationsfilen för ESLint `eslint.config.mjs` är följande bestämt:**

- Bortglömda `console.log` och `alert` varnar bara. De kan inte orsaka buggar och är inte prio 1. Det är teknisk skuld som kan städas upp när tid finns.
- Variabler med `var` och jämförelser med `==` istället för `===` är errors. De kan orsaka buggar och varken ska eller behöver finnas i koden.
- Vue komponenter behöver inte innehålla minst två ord, det är inte nödvändigt och kan överkomplicera komponentnamn som kan beskrivas med ett ord.
