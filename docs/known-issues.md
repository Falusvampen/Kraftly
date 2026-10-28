# Kända brister

| #   | Brist                                                                                             | Påverkan                                                                          | Varför den inte är åtgärdad                                                     |
| --- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1   | Vi är osäkra på om rollbacken funkar                                                              | Det blir svårt att gå tillbaka till en tidigare version i CD delen.               | Vi har glömt bort den eftersom den inte behövde användas.                       |
| 2   | Vi har inte kunnat testa performance med verklig användning, utan enbart med beräkningar.         | Vi kan då inte se hur skillnaderna blir konkret i fält.                           | Vi har inte haft någon automatisk loggning på prestandan.                       |
| 3   | Vissa tester är för specifika                                                                     | Om en komponent ändras så kan testet faila trots att funktionaliteten är densamma | Vi har inte haft tid för att prioritera skuldinventering av testerna som fanns. |
| 4   | Vi har bristande dokumentation på vissa delar, exempelvis deploy.md saknar prod miljöns länk etc. | Låg påverkan eftersom det går att se den i github repo UI                         | Vi glömde bort den delen kanske?                                                |

## Vad vi hade gjort med två veckor till

Vi hade genomfört rollback i staging och produktion, fyllt i uppmätta
deploytider, vi hade gått igenom testfiler och kollat att de inte tex är hardcodade till klassnamn etc.
