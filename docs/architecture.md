# Arkitektur – Kraftly Mina sidor

## Översikt

Frontend byggs som statiska filer och serveras av Nginx. Webbläsaren hämtar
konfiguration och bundle från samma origin och anropar API:t via den
konfigurerade API-adressen. Lokalt körs Nginx/Compose eller Vite och mock-API;
staging och produktion kör samma publicerade image på Render.

```mermaid
flowchart LR
    Browser[Webbläsare] --> CDN[Nginx / statisk frontend]
    CDN -->|HTML, JS, CSS, config.js| Browser
    Browser -->|/api eller API_URL| API[Mock/API-tjänst]
    API --> Data[(Kund- och fakturadata)]
    subgraph Dev[Utveckling]
        CDN
        API
    end
    subgraph Hosted[Staging och produktion på Render]
        CDN2[Nginx-container]
        API2[API-tjänst]
        CDN2 --> API2
    end
```

## Lagren i frontend

| Lager                | Ansvar                                                | Regel                                                              |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------------------ |
| Views och components | Rendera vyer, formulär och tillgängliga interaktioner | UI ska kommunicera via props/events och återanvändbara komponenter |
| Router               | Navigering och skydd av inloggade routes              | Route guard är UX; API:t är alltid den verkliga åtkomstkontrollen  |
| Stores               | Delat användar- och applikationstillstånd             | Access-token lagras i minnet, inte i `localStorage`                |
| Services             | API-anrop, headers och felhantering                   | Anrop går genom den centrala API-klienten                          |
| Utils/config         | Feature flags och miljöberoende konfiguration         | Publik config får aldrig innehålla hemligheter                     |

## Miljöer

| Miljö      | Körning                                      | Syfte                         | Konfiguration                     |
| ---------- | -------------------------------------------- | ----------------------------- | --------------------------------- |
| Dev        | Vite + mock-API lokalt, eller Docker Compose | Utveckling och lokal testning | `.env` från `.env.example`        |
| Staging    | Render, samma image som produktion           | Verifiering före release      | Render/GitHub-miljön `staging`    |
| Produktion | Render, samma verifierade image              | Kundtrafik och demo           | Render/GitHub-miljön `production` |

## Beslut

De viktigaste arkitekturbesluten finns i [beslutsindexet](decisions/README.md):
SPA-rendering, hosting på Render, tokenlagring, runtime feature flags och
Cypress för E2E.

## Ett flöde: inloggningen

```mermaid
sequenceDiagram
    participant B as Webbläsare
    participant F as Frontend
    participant A as API
    B->>F: Fyller i e-post och lösenord
    F->>A: POST /api/v2/auth/login
    A-->>F: Access-token
    F->>F: Lagrar access-token i minnet
    F->>A: Skyddade anrop med Bearer-token
    A-->>F: Kunddata
    F-->>B: Dashboard
```
