# Skalning – Kraftly Mina sidor

## Vad vi vet om trafiken

Kravbilden är cirka 40 000 kunder per månad. De sannolika topparna är fakturadagen,
nyheter om elpriser och lanseringen i Norge. Vi saknar ännu produktionsmätning, så
följande är en dimensioneringsgissning:

- Antagande: 20 % av månadens kunder (8 000) besöker tjänsten på den värsta dagen.
- Antagande: 30 % av dessa gör det under de två mest belastade timmarna.
- Det blir 2 400 sessioner på två timmar, alltså cirka 20 sessioner/minut.
- Med åtta API-anrop per session blir det cirka 160 API-anrop/minut (2,7 req/s).
- Med fem gångers säkerhetsmarginal dimensionerar vi för cirka 800 API-anrop/minut
  (13 req/s) tills vi har riktiga trafikdata.

Detta är trafik mot API:t, inte ett löfte om 40 000 samtidiga användare. Statisk
frontendtrafik räknas separat eftersom browsercache och CDN kan ta den utan ett
API-anrop.

## Vad vi mätte

Mätningarna finns dokumenterade i `docs/cache.md`. Lokalt kördes Autocannon mot
Docker-imagen med 50 anslutningar i 10 sekunder. Staging kördes med 10 anslutningar;
exakt datum och fullständigt kommando saknas, så resultaten är jämförelsepunkter och
inte ett kapacitetstest för produktion.

| Anrop                                | Req/s (avg) |   p99 | Kommentar                                                   |
| ------------------------------------ | ----------: | ----: | ----------------------------------------------------------- |
| GET `/` lokalt                       |      20 694 | 14 ms | 207 000 svar, 200 fel (tidigare mätning gav 8 502 / 50 fel) |
| GET `/assets/index-[hash].js` lokalt |       2 356 | 35 ms | 24 000 svar, 0 fel (faktisk bundle, ~930 MB/s nätverkslast) |
| GET `/api/user` lokalt               |         721 | 76 ms | 7 000 svar, 0 fel (tidigare mätning gav 988 req/s)          |
| GET `/` staging                      |         232 | 63 ms | 2 000+ svar, 0 fel; gratisnivå kan kallstarta               |

Det långsammaste testade lokala API-anropet är alltså inte statisk filservering utan
proxy/API-vägen. `GET /api/consumption` är inte jämförbar med dessa siffror eftersom
mock-API:t medvetet väntar 600 ms innan svaret.

## Vad siffrorna säger

Frontend och hashade assets är inte den uppmätta flaskhalsen:

1. **Staging klarade 232 req/s utan fel**, vilket är ungefär 18 gånger vår
   dimensioneringsgissning på 13 req/s.
2. **Mock-API:t lokalt klarade 721–988 req/s utan fel**, vilket överstiger beräknad
   topp med bred marginal, men mocken är enklare än den riktiga backend-tjänsten och
   bevisar därför inte databasens kapacitet.
3. **Statisk filservering:** Under testet av den faktiska JS-bundlen uppnåddes
   2 356 req/s utan fel (0 errors). Flaskhalsen här var lokal nätverks- och socketbandbredd
   (~930 MB/s data överfört för ~400 kB stora payloads), inte serverkapaciteten.
4. **Fel under stresstest:** HTML-testet gav 200 fel vid över 20 000 req/s, vilket
   indikerar temporär socket exhaustion under syntetisk överbelastning. Den praktiska
   risken är i stället backendens latens, API:ets rate limits och kallstart på staging.

## Vad vi gjorde

1. **Korrigerad Nginx-mall och cache-headers:**
   Tidigare saknades explicita `location`-block i containerns template-fil
   (`default.conf.template`), vilket gjorde att Nginx föll tillbaka på standardregeln
   `try_files $uri $uri/ /index.html;`. Det medförde att felaktiga asset-sökvägar i äldre
   tester returnerade HTML (~710 B per anrop) istället för den faktiska filen.

   Vi har uppdaterat mallen så att containern genererar rätt direktiv vid start:
   - `location /assets/`: Sätter `public, max-age=31536000, immutable`. Hashade assets
     kan cachas permanent i klienten.
   - `index.html`, `config.js` och `version.txt`: Får `no-cache` för att säkerställa att
     klienten alltid validerar ingångsfiler vid ny deploy.
   - Detta förhindrar även SPA-fallbacken från att servera HTML vid saknade scriptfiler,
     vilket eliminerar risken för `SyntaxError: Unexpected token '<'`.

2. **CDN:** Inte nödvändigt för dagens uppskattade trafik. Lägg till CDN när
   staging/produktion visar hög statisk trafik, geografiskt spridda användare eller
   högre p99 på assets. Då krävs cache-regler för hashade assets, fortsatt
   `no-cache` för `index.html`/`config.js`, och ett purge- eller versionsflöde.
3. **Fler instanser:** Skala ut när API-trafiken ligger över 70 % av verifierad
   kapacitet under en topp, eller när p99 passerar 200 ms/felfrekvensen 1 % i fem
   minuter. Med nuvarande underlag motsvarar det en första varningsnivå runt 160
   req/s på staging, men den måste omprövas när vi har riktig backendmätning.
4. **Det vi inte kan påverka:** API-teamet/Jonatan äger backendens svarstid, rate limits,
   databas och felbudget. Vi skickar vidare toppgissningen 13 req/s, ber om en
   dokumenterad rate limit och följer upp med p95/p99, 5xx och timeout-mätning för
   de långsammaste endpoints.

## Varför inte Kubernetes

Kubernetes skulle ge autoskalning, service discovery och mer kontroll över flera
instanser. För den här statiska frontendens trafik och den lilla uppskattade
API-belastningen tillför det främst driftkostnad och mer konfiguration än nytta.
Vi använder därför en container på befintlig plattform och tar Kubernetes först
om behovet av flera tjänster, avancerad autoskalning eller plattformsoberoende
motiverar kostnaden.

## När stänger man en flagga i stället för att rulla tillbaka?

|                   | Feature flag                                                       | Rollback                                                                                  |
| ----------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Tar               | Minuter, utan ny image eller deploy                                | Längre: välj stabil SHA, deploya och verifiera                                            |
| Påverkar          | Den avgränsade funktionen och dess användare                       | Hela releasen och alla användare                                                          |
| Passar när        | Felet ligger bakom en flagga och resten av releasen är frisk       | Felet påverkar start, data, auth eller flera funktioner                                   |
| Regel vi enats om | Stäng flaggan först om det kan göras säkert och felet är avgränsat | Rulla tillbaka direkt vid säkerhets-, dataintegritets- eller breda tillgänglighetsproblem |

Efter båda åtgärderna kontrollerar vi `/version.txt`, `/api`-smoketestet och
felgrad/p99. Tiderna för en verklig rollback är ännu inte uppmätta och ska fyllas i..
