# Slutdemo torsdag 5/11

**Demo-ansvarig:** Louise · **Miljö:** [produktion](https://kraftly-prod-l5qt.onrender.com/) · **Tid:** 10 min demo + 5 min frågor · **Version:** `v1.0`

## Körschema

| Minut | Vad                                             | Vem    | Vad som ska synas                                                                                            |
| ----- | ----------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| 0–1   | Vad vi tog över och vad det kostade beställaren | Louise | README, tre dokumenterade brister, api lät alla komma in utan cors, nycklar hardcoded i kodbas, inga tester. |
| 1–3   | Inloggning och skyddad dashboard                | Louise | Login och aktuell förbrukning                                                                                |
| 3–5   | Fakturor                                        | Tom    | Fakturaöversikt och status                                                                                   |
| 5–7   | Flyttanmälan                                    | Axel   | Formulär, validering och bekräftelse                                                                         |
| 7–9   | Vad vi inte gjorde                              | Tom    | [known issues](known-issues.md) och readiness                                                                |
| 9–10  | Sammanfattning                                  | Louise | Prod, version och en kundnytta                                                                               |
| 10–15 | Frågor                                          | Alla   | –                                                                                                            |

## Förberedelser

- [ ] Prod verifierad samma morgon; `/version.txt` visar SHA för `v1.0`
- [ ] Prod väckt tio minuter före
- [ ] Flikarna öppna i ordning: prod, README, known issues
- [ ] Testkonto förberett och en utloggad flik öppen
- [ ] Skärmdumpar eller inspelning av varje demoögonblick sparad lokalt
- [ ] Generalrepetition genomförd 2/11 eller 3/11 och loggad i [log](log.md)

## Om något går fel

| Om                         | Då                                                               |
| -------------------------- | ---------------------------------------------------------------- |
| Prod svarar inte           | Visa skärmdumpar/inspelning och förklara förväntat flöde         |
| Inloggningen fungerar inte | Byt till den förberedda utloggade fliken och visa reservmaterial |
| Nätet dör                  | Kör presentationen från reservmaterialet                         |
| Vi är efter i tid          | Stryk flyttanmälan först; visa ändå kundnytta, risker och status |
