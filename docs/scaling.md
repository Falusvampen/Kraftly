# Skalning – Kraftly Mina sidor

## Vad vi vet om trafiken

(40 000 kunder/mån, topparna: fakturadagen, elprisnyheter, Norge i vår. Vad betyder det i anrop per minut i värsta fall? Gissa, men skriv ner gissningen.)

## Vad vi mätte

Kommando: `npx autocannon -c 50 -d 10 …` mot imagen lokalt, <datum>

| Anrop                  | Req/s (avg) | p99 | Kommentar |
| ---------------------- | ----------- | --- | --------- |
| GET /                  |             |     |           |
| GET /assets/index-*.js |             |     |           |
| GET /api/user          |             |     |           |
| Mot staging (-c 10): … |

## Vad siffrorna säger

(Var är flaskhalsen? Vad är INTE flaskhalsen? Hur långt är det till gränsen med er gissning ovan?)

## Vad vi gjorde

1. Cache-headers (bevis under M5 i milestones.md). Vad sparar det per återkommande användare?
2. CDN: nu / senare / aldrig, och vad som krävs för att lägga till det.
3. Fler instanser: vid vilken siffra?
4. Det vi inte kan påverka (API:et), och vad vi säger till backend-teamet.

## Varför (inte) Kubernetes

(Tre meningar. Om ni gjorde övning 2 B: vad fick ni, vad kostade det.)

## När stänger man en flagga i stället för att rulla tillbaka?

|                                                                | Feature flag | Rollback |
| -------------------------------------------------------------- | ------------ | -------- |
| Tar                                                            |              |          |
| Påverkar                                                       |              |          |
| Passar när                                                     |              |          |
| Regeln vi enats om: …                                          |
| (Fyll i tiderna i morgon, när ni gjort rollbacken på riktigt.) |
