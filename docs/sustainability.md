# Hållbarhet och etik

## Siffrorna

<Uppmätt med scripts/co2.mjs (co2.js 0.19.0, Sustainable Web Design-modellen v4), datum.>

|                     | kB per besök | g CO2e per besök (SE) | kg CO2e per månad (SE) | kg CO2e per månad (globalt) |
| ------------------- | ------------ | --------------------- | ---------------------- | --------------------------- |
| Före M7 (taggen M6) | 538          | 0,032                 | 4,1                    | 9,9                         |
| Efter M7 (main)     | 273          | 0,016                 | 2,1                    | 5,0                         |

## Metoden och vad vi inte räknar

Vi mätte storleken på okomprimerade filer i byggmappen (`dist/index.html` samt allt under `assets/`) där varje besök beräknas som ett första besök med tom webbläsarcache, baserat på en svensk elmix om 35,89 g CO2e/kWh (SWE) samt en global mix om 472,94 g CO2e/kWh. Trafikvolymen är antagen till 40 000 inloggade kunder med 3,2 sessioner per kund och månad (totalt 128 000 besök), vilket speglar en typisk användning där kunder loggar in några enstaka gånger per månad för att kontrollera förbrukning och fakturor. Modellen inkluderar inte nätverkskomprimering (såsom gzip/brotli), cachelagring vid återbesök (vilket minskar den faktiska överföringen avsevärt efter M7), eller tredjepartsanrop och backendens faktiska driftenergi.
