# AI i utvecklingsflödet

## Vad vi kopplade in

Vi integrerade AI-baserad kodgranskning i vårt GitHub-flöde med hjälp av Claude via Anthropic API. När en pull request skapas eller uppdateras körs ett automatiserat steg som analyserar ändringarna och lämnar kommentarer på potentiella problem i koden.

API-nyckeln lagras som en GitHub Actions Secret och används av arbetsflödet utan att exponeras i källkoden eller loggarna.

AI-granskningen är inte en required check. Det innebär att en pull request inte automatiskt blockeras om AI-granskningen misslyckas eller hittar problem. Obligatoriska tester och övriga kvalitetskontroller fortsätter att hantera de krav som måste uppfyllas innan merge>

## Utvärdering

### claude-opus-5-5, 26–27/10.

| PR  | Punkten i några ord                                             | Träff / miss / oavgjord | Varför |
| --- | --------------------------------------------------------------- | ----------------------- | ------ |
| 116 | Oanvänt fält i mockat API-svar, Potentiell API-nyckel i testkod | 2 0 0                   | …      |

Totalt: … punkter på … PR:ar – … träffar, … missar, … oavgjorda.

## Två exempel

### Träff: Oanvänt fält i mockat API-svar

https://github.com/Falusvampen/Kraftly/pull/116

<citat ur kommentaren>
"apiKey i svaret från submitMove används inte i någon assertion och kan tas bort."

<Vad som var rätt, och vad ni gjorde.>
Detta var en korrekt observation. Fältet behövs inte för att testa komponentens beteende och gör mocksvaret mindre realistiskt. Det tas bort i den riktiga testkoden efter att AI-granskningens signal har verifierats

<citat ur kommentaren>
"TEST_API_KEY är hårdkodad, och kommentaren säger att det är en riktig nyckel. Behandla den som läckt: rotera nyckeln omedelbart.

<Vad som var fel, och varför modellen trodde det.>
Detta var en korrekt träff utifrån diffen: kommentaren påstår att nyckeln är riktig. I en verklig incident ska nyckeln roteras och därefter tas konstanten bort. Om strängen i själva verket bara är testdata ska det dokumenteras tydligt och fyndet kan omklassificeras efter verifiering.

### Hur vi skapar en verklig miss

En miss ska inte skapas genom att lägga in en riktig säkerhetsrisk och sedan kalla den falsk. Använd i stället en avsiktligt verifierbar falsk positiv, till exempel ett test som mockar en underkomponent: modellen kan felaktigt hävda att produktionskomponenten saknar funktionalitet, trots att testets scope uttryckligen isolerar den underkomponenten. Kontrollera sedan påståendet mot källkoden och markera det som miss om beteendet faktiskt finns eller ligger utanför testets scope.
På samma sätt är en miss när modellen påstår att en hårdkodad sträng används för autentisering, men källkoden visar att den bara är en dokumenterad, syntetisk fixture och aldrig lämnar en testmock. Credential-liknande text bör dock alltid verifieras först.

### Vår regel

AI-kommentarer är förslag och måste verifieras mot den faktiska diffen. Fynd som faktiskt syns i diffen, särskilt credential-liknande data eller olämpliga kommentarer, är träffar även om de förekommer i ett test. Syntetisk testdata kan omklassificeras först efter att det verifierats att den inte används för autentisering. Påståenden om kod eller beteende som inte stämmer med källan räknas som missar och ska inte åtgärdas.

Vi sprang på ett problem tidigare, där botten spottade ut API-nyckeln synligt som kommentar i vårt publika repo. Lärde oss en läxa.
