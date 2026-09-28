# Beslut: feature flags

**Datum:** 2026-09-24
**Beslut:** Kraftly använder körtidsflaggor i `config.js`, som skrivs när containern startar, så samma Docker-image kan köras med olika funktioner i lokalt, staging och produktion.

## Bakgrund

Norge-expansionen behöver finnas med i samma kod och image som resten av applikationen, men ska kunna visas i staging utan att synas för kunder i produktion. Det kräver att flaggan bestäms när containern startar, efter att imagen har byggts.

I frontend läses flaggor via `src/utils/features.js`. I Docker skapar `docker/40-runtime-config.sh` `config.js` från miljövariablerna `APP_ENV` och `FEATURE_NORWAY` när Nginx startar. På Render sätts därför `FEATURE_NORWAY=true` i den miljö där Norge ska visas. Bara det exakta värdet `true` aktiverar flaggan; saknat, tomt eller felstavat värde betyder av.

## Alternativ vi jämförde

| Alternativ                            | Hur                                                                   | Bryter det mot "bygg en gång"?                                          | Nackdel                                                                     |
| ------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Långlivad branch                      | Separat branch eller kodvariant för Norge och övriga miljöer.         | Ja. Vi riskerar separata kodlinjer och images som måste hållas synkade. | Mer mergearbete och större risk att staging och produktion kör olika kod.   |
| Byggtidsflagga (`VITE_…`)             | Flaggan bäddas in i frontend-bundlen när `npm run build` körs.        | Ja. Varje miljö behöver en egen build med rätt flaggvärde.              | Samma image kan inte konfigureras om vid deploy eller omstart.              |
| Körtidsflagga (`config.js` vid start) | Containern skriver `config.js` från miljövariabler när Nginx startar. | Nej. Samma image kan användas i alla miljöer.                           | Kräver miljökonfiguration på Render och tydlig hantering av publika värden. |

## Motivering

Vi valde körtidsflaggan eftersom den är det enda alternativet som uppfyller principen "bygg en gång". CI bygger och publicerar en image från `main`; Render kan sedan välja funktioner genom sina miljövariabler utan att källkod eller image behöver ändras.

Lösningen passar också vår Nginx-container: frontendens statiska filer byggs i Dockerfilens första steg och serveras därefter av Nginx, medan `config.js` kan skrivas över i entrypoint-steget. Flaggor läses genom en gemensam hjälpfunktion i stället för direkt från `window`, vilket gör dem möjliga att hitta, testa och ta bort.

## Konsekvenser

Det kostar ett extra konfigurationsvärde per miljö. På Render ska `FEATURE_NORWAY` vara `true` i staging om Norge ska visas och vara av eller saknas i produktion tills lanseringen är godkänd. Konfigurationen i `config.js` är publik och får därför aldrig innehålla hemligheter eller API-nycklar.

En flagga som saknas eller inte är exakt `true` är avsiktligt säkerhetsmässigt konservativt. När Norge-funktionen är permanent ska flaggan tas bort i samma ändring som den villkorade UI-koden, testet och miljövariabeln tas bort. Tech lead ansvarar för att rensa flaggan i kod, Render och dokumentation.
