# Beslut: verktyg för E2E-tester

**Datum:** 2026-08-28
**Beslut:** Vi använder **Cypress** för end-to-end-tester.

## Bakgrund

Vi behöver ett E2E-smoketest i CI (M2) och vill kunna mocka API:et.
Teamet kan Cypress sedan tidigare. Playwright utvärderades idag.

## Vad vi såg

|                                | Cypress                                                                                                       | Playwright                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Tid till första gröna test** | Det gick snabbt att komma igång eftersom vi redan har använt Cypress.                                         | Det gick fort att få ett första test att köra, men det var lite mer förvirrande.                     |
| **Hur man hittar element**     | Väldigt enkelt och bekvämt med `cy.get()`.                                                                    | Verkar väldigt bra med `getByRole()`, `getByText()` och `getByTestId()`. Dock mer att hålla koll på. |
| **Mockning av nätverk**        | Skönt med inbyggt stöd för `cy.intercept()`, vilket är enkelt att använda.                                    | Också inbyggt stöd via `page.route()`, vi märkte inte jättestor skillnad.                            |
| **Väntan / flakiness**         | Cypress väntar automatiskt på mycket (t.ex. kommandon och assertions). Det minskar behovet av manuella waits. | Inte så stor skillnad, auto-waiting väntar också på mycket.                                          |
| **Felmeddelanden**             | Tydliga felmeddelanden, när något failar ser man direkt vilken rad det skedde på.                             | Tydliga felmeddelanden med stack traces och trace viewer.                                            |

## Motivering

Vi väljer **Cypress** eftersom vi har använt det tidigare, vill fortsätta lära oss mer om det och kommer då igång snabbare. Vi ser inget speciellt i Playwright som vi inte kan använda Cypress för i detta projekt.

## Konsekvenser

Playwright har teknsikt sätt mer avancerade rapporterings och felsökningsmöjligheter än Cypress som vi ger upp, samt vissa andra möjligheter som parallell körning av test. Om våra behov förändras i framtiden kanske vi behöver skriva om testerna och anpassa CI för att byta till Playwright.
