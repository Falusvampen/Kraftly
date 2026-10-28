# Hållbarhet och etik

## Siffrorna

<Uppmätt med scripts/co2.mjs (co2.js 0.19.0, Sustainable Web Design-modellen v4), datum.>

|                     | kB per besök | g CO2e per besök (SE) | kg CO2e per månad (SE) | kg CO2e per månad (globalt) |
| ------------------- | ------------ | --------------------- | ---------------------- | --------------------------- |
| Före M7 (taggen M6) | 538          | 0,032                 | 4,1                    | 9,9                         |
| Efter M7 (main)     | 273          | 0,016                 | 2,1                    | 5,0                         |

## Metoden och vad vi inte räknar

Vi mätte storleken på okomprimerade filer i byggmappen (`dist/index.html` samt allt under `assets/`) där varje besök beräknas som ett första besök med tom webbläsarcache, baserat på en svensk elmix om 35,89 g CO2e/kWh (SWE) samt en global mix om 472,94 g CO2e/kWh. Trafikvolymen är antagen till 40 000 inloggade kunder med 3,2 sessioner per kund och månad (totalt 128 000 besök), vilket speglar en typisk användning där kunder loggar in några enstaka gånger per månad för att kontrollera förbrukning och fakturor. Modellen inkluderar inte nätverkskomprimering (såsom gzip/brotli), cachelagring vid återbesök (vilket minskar den faktiska överföringen avsevärt efter M7), eller tredjepartsanrop och backendens faktiska driftenergi.

## Etikfall: Chatta med Kraftly

Affärsutveckling på Kraftly har sett att kundtjänst får flest samtal veckan efter fakturan, och att den vanligaste frågan är "varför blev fakturan så hög?". De vill ha en AI-support i portalen: en ruta Chatta med Kraftly på översikten. För att kunna svara skickas kundens timförbrukning och fakturor med i varje fråga till en extern modell-API – modellen körs hos en annan leverantör, inte på Kraftlys servrar. Leverantören är bestämd, avtalet är "nästan klart", och produktägaren vill att ni bygger en första version i nästa sprint. Hon frågar teamet: "Ni har väl inget emot det här?"

**Situationen.** Affärsutveckling vill införa AI-supporten "Chatta med Kraftly" på portalens översikt för att avlasta kundtjänst angående fakturafrågor. För varje ställd fråga skickas kundens detaljerade timförbrukning och fakturahistorik till en extern leverantörs modell-API utanför Kraftlys egna servrar. Produktägaren ber utvecklingsteamet att bygga en första version i kommande sprint, trots att leverantörsavtalet bara är "nästan klart".

**Vårt beslut.** Ja med villkor – vi påbörjar inte utvecklingen i nästa sprint förrän de juridiska, tekniska och integritetsmässiga förutsättningarna är fastställda och kontrollerbara.

**Varför.** Förslaget strider mot principerna om dataminimering, ändamålsbegränsning och transparens. Timförbrukning är högst integritetskänslig data som kan avslöja kundens dygnsrytm, närvaro i hemmet och personliga vanor. En kund som skriver en fråga i en chatt ruta förväntar sig en dialog med en supportassistent, inte att hela sin historiska förbruknings- och fakturadatabas samt personuppgifter per automatik exporteras till en extern tredjepart. Att dessutom skicka data innan ett personuppgiftsbiträdesavtal är färdigställt innebär en direkt rättslig överträdelse.

**Vad vi gör i stället / villkor.**

- Rå timförbrukning skickas inte. Vi aggregerar datan till månadstotaler, snittpriser och procentuella avvikelser. Känsliga personuppgifter (som personnummer, namn eller fullständig adress) tvättas bort innan API-anropet görs.

- Databehandlingen/analysen av räknesnurran sker primärt på Kraftlys egna servrar (lokalt/in-house). Endast anonyma, aggregerade sammanfattningar skickas till det externa API-et. Leverantören måste garantera servrar inom EU/EES.

- Ett undertecknat Personuppgiftsbiträdesavtal måste vara på plats, med en explicit klausul om Zero Data Retention (ingen lagring hos leverantören) och förbud mot att använda Kraftlys data för modellträning.

- Aktivt samtycke (opt-in). Kunden får vid första klick på chatten en tydlig information om vilken data som analyseras och måste godkänna detta innan analysen körs. Chatten fungerar annars i ett generellt läge utan tillgång till kundens fakturor.

- Kraftly är personuppgiftsansvarig och äger reglerna för datalivscykeln.

- Inga chattloggar sparas hos den externa leverantören. I Kraftlys egna system loggas enbart teknisk status och anonymiserad statistik; chattkonversationen rensas så fort sessionen avslutas.
