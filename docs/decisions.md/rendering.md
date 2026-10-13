# Beslut av rendering

## Alternativen vi kollade på

SPA, SSR (Nuxt) eller SSG för portalen

## Jämförelse: SPA, SSR (Nuxt) och SSG

En snabb överblick av tre vanliga arkitekturer för moderna webbapplikationer.

## 1. SPA (Single Page Application)

- **Hur det fungerar:** Servern skickar en tom HTML-sida och ett stort JavaScript-paket. Webbläsaren bygger sedan upp hela sidan lokalt hos användaren.
- **Fördelar:** Extremt snabb navigering efter första laddningen; känns som en app.
- **Nackdelar:** Långsam första laddning; dålig SEO eftersom sökmotorer ofta ser en tom HTML-sida.
- **Bästa användningsområde:** Inloggade system, adminpaneler och instrumentpaneler (dashboards).

## 2. SSR (Server-Side Rendering – t.ex. Nuxt)

- **Hur det fungerar:** Servern skapar och renderar färdig HTML för varje unik förfrågan i realtid innan sidan skickas till användaren.
- **Fördelar:** Utmärkt SEO; snabb första laddning (First Contentful Paint); dynamiskt innehåll är alltid uppdaterat.
- **Nackdelar:** Kräver en aktiv Node.js-server; högre serverbelastning vid mycket trafik; något mer komplex arkitektur.
- **Bästa användningsområde:** E-handel, nyhetssajter och plattformar med mycket dynamiskt innehåll som kräver bra SEO.

## 3. SSG (Static Site Generation)

- **Hur det fungerar:** Alla sidor byggs och renderas till färdiga HTML-filer i förväg (vid _build time_) och distribueras via ett globalt CDN.
- **Fördelar:** Extremt snabbt; maximal säkerhet (ingen databas/server att hacka); billigt att drifta och hanterar enorma trafiktoppar utan problem.
- **Nackdelar:** Om du ändrar något i innehållet måste hela webbplatsen byggas om; passar inte för realtidsdata.
- **Bästa användningsområde:** Bloggar, dokumentationssajter, portföljer och företagssajter.

---

## Snabbguide: Vad ska jag välja?

| Krav                                | SPA              | SSR (Nuxt)       | SSG           |
| :---------------------------------- | :--------------- | :--------------- | :------------ |
| **Bästa möjliga SEO**               | ❌ Nej           | Ja               | Ja            |
| **Användarunikt/Inloggat innehåll** | Ja               | Ja               | ❌ Nej        |
| **Snabbast möjliga laddtid**        | ⏳ Långsam start | Snabb            | 🚀 Blixtsnabb |
| **Infrastruktur**                   | Enkel (Static)   | Komplex (Server) | Enkel (CDN)   |

## När ska detta beslut omprövas
