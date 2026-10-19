# Tillgänglighet

_Mål: WCAG 2.2 nivå AA. Kontrollerat med axe i komponenttesterna, Storybooks
Accessibility-flik och en genomgång med tangentbordet. Storybook och axe körs
lokalt (i pipelinen: M9)._

Det här dokumentet innehåller M8:s före-läge. Efterkolumnen fylls i först när
respektive spår är genomfört och verifierat.

## Komponentbiblioteket

| Komponent | Ersätter                                             | API                                                                       |
| --------- | ---------------------------------------------------- | ------------------------------------------------------------------------- |
| `KButton` | `BaseButton`, `AppButton` och klickbara `div`/`span` | `variant`: primary · secondary · text, `type`, `block`, texten är en slot |

Komponentbiblioteket och dess slutliga API är ännu inte infört i före-läget.

```text
npm run storybook    # komponenterna med stories, fliken Accessibility
npm run test:a11y    # axe-testerna (filerna *.a11y.test.js)
```

## Gemensamt före-läge

| Kontroll                    | Före                                                               | Källa                                                       |
| --------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------- |
| Dokumentets språk           | `<html lang="sv">` finns redan                                     | Kodläsning: `index.html`                                    |
| Sidtitel                    | `Kraftly` finns redan                                              | Kodläsning: `index.html`                                    |
| Fakturatabellens rubriker   | `<th>` saknar `scope="col"`                                        | Kodläsning: `src/views/InvoicesView.vue`                    |
| Fokus på utloggning         | `Logga ut` är en `<span @click>`, inte ett fokuserbart element     | Kodläsning: `src/App.vue`; tangentbordstest                 |
| Fokus på fler spartips      | `Fler spartips` är en `<div @click>`, inte ett fokuserbart element | Kodläsning: `src/views/DashboardView.vue`; tangentbordstest |
| Fokus på fakturanedladdning | `Ladda ner` är en `<div @click>`, inte ett fokuserbart element     | Kodläsning: `src/views/InvoicesView.vue`; tangentbordstest  |

## Tangentbordsgenomgång

Genomgången gjordes på `main` före ändringar med musen undanlagd. Endast
Tab, Shift+Tab, Enter och mellanslag användes.

**Testdatum:** 2026-10-19  
**Testare:** Kodläsning och lokal webbläsarkontroll  
**Miljö/URL:** Lokal utvecklingsserver, `http://localhost:5173`

| Vy             | Vad vi testade                                                                                    | Före                                                                                                                                                                       | Efter                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Inloggning     | Tab genom e-post, lösenord och `Logga in`; Shift+Tab tillbaka; aktivering med Enter               | E-post → lösenord → `Logga in` går att nå. Enter på knappen kan aktivera inloggning. Fälten saknar synliga labels och har bara placeholder som namn.                       | Labels och unika id:n är tillagda i koden. Ny manuell tangentbordsgenomgång efter ändringen återstår.                   |
| Översikt       | Tab genom navigation och innehåll; försök att nå `Fler spartips`; aktivering med Enter/mellanslag | Navigationslänkarna får fokus. `Fler spartips` får inte fokus eftersom den är en `<div @click>` och kan därför inte aktiveras med Enter eller mellanslag.                  | —                                                                                                                       |
| Fakturor       | Tab genom navigation och fakturarader; försök att nå `Ladda ner`; aktivering med Enter/mellanslag | Navigationslänkarna får fokus. `Ladda ner` får inte fokus eftersom den är en `<div @click>` och kan därför inte aktiveras med Enter eller mellanslag.                      | —                                                                                                                       |
| Flyttanmälan   | Tab genom adress, postnummer, ort, datum, avtal och submit-knapp; Shift+Tab tillbaka              | Fälten, avtalslistan och submit-knappen går att nå i ordning. Fälten saknar kopplade labels och avtalslistan saknar label. Shift+Tab går bakåt genom samma kontroller.     | Labels och unika id:n är tillagda för alla fält och avtalet. Ny manuell tangentbordsgenomgång efter ändringen återstår. |
| Mina uppgifter | Tab genom namn, e-post, adress, `Spara ändringar` och `Ångra`; Shift+Tab tillbaka                 | Namn → e-post → adress → `Spara ändringar` → `Ångra` går att nå. Knapparna är fokuserbara, men textfälten saknar kopplade labels. Shift+Tab går bakåt genom samma ordning. | Labels, unika id:n och autocomplete-attribut är tillagda. Ny manuell tangentbordsgenomgång efter ändringen återstår.    |
| Utloggning     | Tab genom navigationen; försök att nå och aktivera `Logga ut`                                     | `Logga ut` får inte fokus eftersom den är en `<span @click>`. Den kan därför inte aktiveras med enbart tangentbord.                                                        | —                                                                                                                       |

Efter att spåren har mergats fylls kolumnen **Efter** i med en ny genomgång.

## Vad vi åtgärdade

| Brist                                          | Var                                        | Hittades med                                                              | Åtgärd (PR)                                                                                                        |
| ---------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Fält med bara placeholder                      | `LoginView`, `ProfileView`, `MoveForm`     | Kodläsning före M8; `getByLabelText` i formulärtesterna                   | Labels och id:n tillagda i `LoginView`, `ProfileView` och `MoveForm`; testerna använder label-baserade selektorer. |
| Login-vyn saknade tillgänglighetstest          | `src/views/LoginView.a11y.test.js`         | `axe(container)` och `getByLabelText`                                     | Axe-test och label-test tillagda på denna gren.                                                                    |
| Klickbar `div` eller `span` som inte får fokus | `DashboardView`, `InvoicesView`, `App.vue` | Tangentbordet och kodläsning; axe-resultat kompletteras efter testkörning | —                                                                                                                  |
| Tabellrubriker utan `scope`                    | `InvoicesView`                             | Kodläsning                                                                | —                                                                                                                  |

## Vad axe inte hittar

| Före-fynd                                                                                     | Varför axe inte hittar det                                                                                                |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `Fler spartips` kan inte nås med Tab eller aktiveras med Enter/mellanslag                     | Axe kan kontrollera många regelbrott i markup, men ersätter inte en faktisk tangentbordsgenomgång av hela användarflödet. |
| `Ladda ner` kan inte nås med Tab eller aktiveras med Enter/mellanslag                         | Samma funktionella tangentbordsflöde måste kontrolleras manuellt.                                                         |
| `Logga ut` kan inte nås med Tab eller aktiveras med Enter/mellanslag                          | Samma funktionella tangentbordsflöde måste kontrolleras manuellt.                                                         |
| Det är inte dokumenterat vart fokus hamnar efter inloggning eller vad en skärmläsare läser då | Fokusflytt och uppläsning kräver manuell interaktion och skärmläsartest.                                                  |

## Inventering före M8

Inventeringen är beviset för att efterläget täcker det som faktiskt fanns
före ändringen.

### Klickbara icke-interaktiva element

| Element         | Plats                         | Före-brist                                     |
| --------------- | ----------------------------- | ---------------------------------------------- |
| `Logga ut`      | `src/App.vue`                 | `<span @click>` kan inte nås med tangentbordet |
| `Fler spartips` | `src/views/DashboardView.vue` | `<div @click>` kan inte nås med tangentbordet  |
| `Ladda ner`     | `src/views/InvoicesView.vue`  | `<div @click>` kan inte nås med tangentbordet  |

### Knappvarianter

| Variant           | Plats                           | Användning före M8 |
| ----------------- | ------------------------------- | ------------------ |
| `BaseButton`      | `src/components/BaseButton.vue` | Flyttanmälan       |
| `AppButton`       | `src/components/AppButton.vue`  | Profil             |
| Direkt `<button>` | `src/views/LoginView.vue`       | Inloggning         |

### Fält utan kopplad label

| Vy             | Fält                                          | Plats                         | Före-brist                                                  |
| -------------- | --------------------------------------------- | ----------------------------- | ----------------------------------------------------------- |
| Inloggning     | E-postadress                                  | `src/views/LoginView.vue`     | `<input>` har placeholder men saknar `id` och `<label for>` |
| Inloggning     | Lösenord                                      | `src/views/LoginView.vue`     | `<input>` har placeholder men saknar `id` och `<label for>` |
| Mina uppgifter | Namn                                          | `src/views/ProfileView.vue`   | `<input>` saknar label och id                               |
| Mina uppgifter | E-post                                        | `src/views/ProfileView.vue`   | `<input>` saknar label och id                               |
| Mina uppgifter | Adress                                        | `src/views/ProfileView.vue`   | `<input>` saknar label och id                               |
| Flyttanmälan   | Ny adress, postnummer, ort, inflyttningsdatum | `src/components/MoveForm.vue` | `BaseInput` används utan `label` och `id`                   |
| Flyttanmälan   | Avtal                                         | `src/components/MoveForm.vue` | `<select>` saknar label och id                              |

## Verifierade kommandon på denna gren

```text
npm run test:a11y
2 testfiler passerade, 3 tester passerade

npx vitest run src/views/LoginView.a11y.test.js tests/Component/MoveForm.test.js tests/Component/MoveFormView.test.js
3 testfiler passerade, 6 tester passerade

npm run test:run -- --reporter=dot
15 testfiler passerade, 42 tester passerade

npm run lint -- src/views/LoginView.vue src/views/ProfileView.vue src/components/MoveForm.vue src/views/LoginView.a11y.test.js tests/Component/MoveForm.test.js tests/Component/MoveFormView.test.js cypress/e2e/smoke.cy.js cypress/e2e/invoices.cy.js
godkänd

npm run build
godkänd

npm run build-storybook
godkänd; Storybook 10.6.1 byggdes. Vite rapporterade endast chunk-size-varningar.
```

## Bevis som ska kompletteras

Följande fylls i efter att verktygen och spåren är klara:

- före och efter för kontrastvärden från Storybooks Accessibility-flik
- `Violations` per ändrad story före och efter
- sista raderna från `npm run test:run` före taggning
- efterresultat från tangentbordsgenomgången
- `KButton`-story och dess `Violations 0`

## Kända brister

Följande är inte verifierat i före-läget:

- skärmläsare
- 200 % zoom
- kontrastvärden från Accessibility-fliken
- Storybook-violations
- fullständig axe-körning mot alla formulärvyer
- fokusets slutposition efter inloggning och vad en skärmläsare skulle läsa där

Detta är avsiktligt dokumenterat som okontrollerat, inte som godkänt.
