# Produktionsfärdig app – readiness

Statusen är en ärlig ögonblicksbild inför M10. `känd brist` betyder att arbetet
är dokumenterat men inte färdigt; kritiska brister får inte lämnas i den
kategorin.

| Område        | Punkt                                     | Status               | Bevis                                                                         |
| ------------- | ----------------------------------------- | -------------------- | ----------------------------------------------------------------------------- |
| Start         | Lokal start och health check              | klart                | [README](../README.md), `npm run start`, `/healthz`                           |
| Dokumentation | README och dokumentationstabell           | klart                | [README](../README.md)                                                        |
| Dokumentation | Arkitekturskiss och miljöer               | klart                | [architecture](architecture.md)                                               |
| Dokumentation | Minst tre beslutsdokument                 | klart                | [beslutsindex](decisions/README.md)                                           |
| Säkerhet      | Hemligheter utanför repo                  | klart                | [deploy](deploy.md), `.env.example`                                           |
| Säkerhet      | Auth, skyddade API-anrop och tokenpolicy  | klart                | [security](security.md), [tokenbeslut](decisions/tokenlagring.md)             |
| CI/CD         | PR-grind och grön main                    | klart                | [pipeline](pipeline.md)                                                       |
| CI/CD         | Produktionsrollback med verifiering       | känd brist           | [deploy](deploy.md), [known issues](known-issues.md)                          |
| Tester        | Unit-, komponent- och E2E-kommandon       | klart                | [testing](testing.md), `npm run test:run`                                     |
| Accessibility | Full M8-granskning och inklistrade utdrag | känd brist           | [accessibility](accessibility.md)                                             |
| Performance   | Tre optimeringar med före/efter-mätning   | känd brist           | [performance](performance.md)                                                 |
| Release       | M10-dokumentation och feature freeze      | klart                | [milestones](milestones.md), [demo](demo.md), [known issues](known-issues.md) |
| Release       | Releasearbete                             | v.12                 | [milestones](milestones.md)                                                   |
| Kurskrav      | Stories för samtliga komponenter          | utgår (beslut 12/10) | M8-kravet utgick                                                              |
| Kurskrav      | Axe-test per formulärvy                   | utgår (beslut 12/10) | M8-kravet utgick                                                              |
| Demo          | Körschema och reservplan                  | klart                | [demo](demo.md)                                                               |
| Demo          | Generalrepetition                         | saknas               | Genomförs 2/11 eller 3/11 och loggas i [log](log.md)                          |

Inga kända kritiska brister står kvar: kunddata exponeras inte, inloggningen
kringgås inte och main ska verifieras grön före taggning. Rollback-bristen är
inte kritisk enligt definitionen eftersom den manuella vägen är dokumenterad,
men den behöver testas före `v1.0`.
