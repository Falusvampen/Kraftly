# Säkerhet – Kraftly

## Hotbilden i en mening

Portalen hanterar kunders elförbrukning, fakturor och personuppgifter (GDPR). Det primära hotet är obehörig åtkomst eller dataläckage (IDOR, sessionskapning eller XSS) orsakad av externa angripare eller andra inloggade kunder.

## Autentiseringen (M6)

Kunden loggar in via `/login` mot `/api/v2/auth/login` med e-postadress och lösenord. Vid lyckad inloggning returneras en kortlivad JWT access token (10 minuter) i svaret, medan en refresh token sätts av backend i en säker, `httpOnly`-cookie.

Access token lagras uteslutande i JavaScript-minnet (`src/services/token.js`) och skrivs aldrig till webblagring (`localStorage`/`sessionStorage`). Vid sidomladdning eller vid 401-svar begär klienten en ny access token mot `/api/v2/auth/refresh` med hjälp av cookien.

API:t skyddas genom att varje anrop skickar med `Authorization: Bearer <token>`. Klientens route guard är en ren UX-åtgärd; den faktiska auktoriseringen sker på servern, som nekar anrop utan giltig token med `401 Unauthorized`. All proxy-trafik till API:t går via Nginx på samma origin, vilket gör att öppen CORS inte behövs.

## OWASP Top 10 – genomgång

| #   | Risk                                  | Gäller oss? | Vad vi hittade                                                                                                                            | Vad vi gjorde                                                                                                                                                   | Kontroll                                                                                            |
| --- | ------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| A01 | Broken Access Control                 | Ja          | Fejkad inloggning via `localStorage.kraftly_logged_in` gav skenbar åtkomst. Potentiell IDOR om endpoints litar på kund-ID i querystrings. | Tog bort all lokal sessionsflagga. Data hämtas uteslutande baserat på identiteten i JWT-token. Route guard omdirigerar oinloggade.                              | `curl -s -o /dev/null -w "%{http_code}\n" https://<staging>/api/v2/invoices` ger `401`.             |
| A02 | Security Misconfiguration             | Ja          | Nginx saknade CSP, MIME-sniffing-skydd och klickkapningsskydd. Nginx nollställde headers i location-block med egna `add_header`.          | Skapade `docker/security-headers.conf` och inkluderade filen i server-blocket samt i samtliga location-block (`/assets/`, `/index.html`, etc.).                 | `curl -I https://<staging>/assets/` visar CSP och `nosniff`.                                        |
| A03 | Software Supply Chain Failures        | Ja          | Sårbara npm-beroenden i containerbygget.                                                                                                  | Pipelinen kör `npm ci --ignore-scripts` och `npm run build` i en låst Node 22-alpine-container.                                                                 | CI-steget `quality` och `build` validerar beroenden och bygger rent.                                |
| A04 | Cryptographic Failures                | Ja          | Sessionsdata exponerad i klartext vid lokal lagring. Saknad tvingande HTTPS.                                                              | Tokens sparas aldrig i webblagring. HSTS (`Strict-Transport-Security`) aktiverat i Nginx för att tvinga TLS överallt.                                           | Enhetstest i Vitest verifierar tomt `localStorage`. `curl -I` visar HSTS-header.                    |
| A05 | Injection (XSS för oss)               | Ja          | Om XSS uppstår kan skript komma åt känslig webblagring eller bädda in portalen i skadliga iframes.                                        | Införde Content Security Policy (`default-src 'self'`) och `frame-ancestors 'none'` / `X-Frame-Options: DENY`. Vue escaperar HTML som standard.                 | `curl -I https://<staging>/` verifierar CSP och X-Frame-Options.                                    |
| A06 | Insecure Design                       | Ja          | Avsaknad av sessionsförnyelse utan att kompromittera säkerheten vid reload.                                                               | Implementerade minnesbaserad tokenlagring kombinerad med `httpOnly`-cookie för refresh vid app-initialisering.                                                  | Manuell reload i webbläsaren behåller sessionen utan att token syns i Storage.                      |
| A07 | Authentication Failures               | Ja          | Portalen släppte tidigare in vem som helst utan kontroll mot backend.                                                                     | Riktig inloggning mot `/api/v2/auth/login`. Felmeddelanden presenteras med `role="alert"` utan att avslöja om e-post eller lösenord var felkällan.              | Enhetstester för `api.js` och felinloggning.                                                        |
| A08 | Software/Data Integrity Failures      | Ja          | Manipulering av klientkod eller oritad konfiguration vid runtime.                                                                         | Dist-filer byggs som immutable assets och versionssätts via Git SHA på `/version.txt`.                                                                          | CI-pipeline bygger och taggar immutabla Docker-images till GHCR.                                    |
| A09 | Logging & Alerting Failures           | Mindre      | Klientloggar loggar potentiellt känsliga uppgifter i console.                                                                             | Rensat ut `console.log` med payload-data i auth- och flyttflöden.                                                                                               | Manuell kodgranskning i PR.                                                                         |
| A10 | Mishandling of Exceptional Conditions | Ja          | 401 från API:t vid utgången token kunde hänga klienten eller krascha sidan.                                                               | Central felhantering i `api.js` fångar 401, kör en automatisk `refreshAccessToken()` och försöker anropet en gång till. Det andra försöket refreshas inte igen. | Enhetstester i `api.test.js` verifierar både lyckad refresh och att upprepade 401 inte ger en loop. |

## Headers vi sätter (nginx)

Följande headers appliceras globalt och i varje location-block via `/etc/nginx/snippets/security-headers.conf`:

- `Content-Security-Policy`: Begränsar skriptexekvering, externa kopplingar och ramverk.
- `X-Content-Type-Options: nosniff`: Skyddar mot MIME-sniffing.
- `X-Frame-Options: DENY`: Förhindrar klickkapning i äldre webbläsare.
- `Referrer-Policy: strict-origin-when-cross-origin`: Begränsar referer-läckage.
- `Strict-Transport-Security`: Tvingar HTTPS.

### Verifiering från Staging (`curl -I`)

Körning mot rot-adressen (`https://<staging>/`):

```http
HTTP/2 200
server: nginx
content-type: text/html
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
strict-transport-security: max-age=31536000; includeSubDomains
```

Körning mot cache-skyddat asset (`https://<staging>/assets/`):

```http
HTTP/2 200
server: nginx
cache-control: public, max-age=31536000, immutable
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';
x-content-type-options: nosniff
x-frame-options: DENY
```

## Kända brister (medvetet kvar)

- style-src 'unsafe-inline' i CSP: Tillåts för närvarande eftersom Vues SFC (Single File Components) och styling injicerar inline-stilar vid runtime. Att ersätta detta med nonces eller hashes skjuts upp till framtida optimeringsarbete.

- Ingen klientbaserad rate limiting på inloggning: Skydd mot brute-force på inloggningsformuläret hanteras inte i frontend utan förlitar sig helt på att backend eller en framtida reverse proxy (t.ex. Cloudflare/WAF) stryper upprepade misslyckade anrop.

- Mindre minnesläcka vid session expiry: Om användaren lämnar fliken öppen längre än refresh-cookiens livslängd upptäcks utloggningen först när nästa aktiva anrop görs, snarare än via en aktiv bakgrundstimer.

- Klientens logout rensar access-token ur minnet, men kan inte själv radera en `httpOnly` refresh-cookie. Backendens logout-/tokenrevokeringskontrakt behöver därför verifieras separat.
