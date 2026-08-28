# Teststrategi – Kraftly Mina sidor

Denna teststrategi definierar testnivåer, ansvarsområden, regler och konventioner för _Kraftly Mina sidor_. Målet är att säkerställa hög tillförlitlighet i kritiska flöden med en sund balans mellan kvalitet och utvecklingstempo.

---

## 1. Testnivåer & Verktyg

| Nivå                   | Verktyg / Stack                  | Syfte & Omfång                                                                                 |
| :--------------------- | :------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Enhet (_Unit_)**     | `Vitest`                         | Testar isolerad affärslogik, hjälpfunktioner, stores och API-klient utan rendering av UI.      |
| **Komponent**          | `Vitest` + `Vue Testing Library` | Testar komponenter där flera lager interagerar (rendering, användarinteraktion, props/events). |
| **E2E (_End-to-End_)** | `Cypress`                        | Simulerar kompletta användarresor och kritiska flöden genom hela applikationen.                |

---

## 2. Testkarta: Vad testas var?

### 🧩 Enhetstester (_Unit_)

> **Fokus:** Isolerad logik och beräkningar utan DOM-beroenden.

- **Prisformatering:** Korrekt avrundning, valutasymboler och hantering av decimaler/ogiltiga indata.
- **Förnamn i hälsningsfras:** Extrahering och formatering av namn.
- **Fakturastatus:** Logik för att avgöra om en faktura är betald, obetald eller förfallen.
- **Validering av flyttanmälan:** Fältvalidering (personnummer, datum, postnummer).
- **State Management (Stores):**
  - `user`
  - `consumption`
- **API-klient (`api.js`):** Request-byggare, headers, felhantering och svarskoder.

---

### 📦 Komponenttester

> **Fokus:** Samarbetande UI-lager, händelsehantering och tillståndsväxlingar.

- **StatusChip:** Korrekt visuell indikator
- **Flyttanmälans formulär:** Interaktion, dynamiska valideringsfel och formulärsubmits.
- **Förbrukningsdiagrammet**

---

### 🌐 End-to-End-tester (_E2E_)

> **Fokus:** Kritiska användarflöden genom hela systemet.

- **Inloggningsflödet:**
- **Navigation mellan sidor:** Routing, åtkomstkontroll för skyddade sidor och menynavigering.

---

## 3. Principer & Regler

### Kodgranskning & PR (_Pull Requests_)

- **Gröna tester är ett krav:** En PR får endast mergas när alla tester är gröna och täcker den relevanta funktionaliteten.
- **Ny logik = Nya tester:** All ny funktionalitet ska åtföljas av motsvarande enhets- eller komponenttester.
- **Buggfixar:** Varje buggfix ska inkludera ett **regressionstest** som reproducerar buggen och verifierar åtgärden.

### Mockning & Täckning

- **API-mockning:** Backend-anrop mockas konsekvent via Vites mock-verktyg (`vi.mock` / `vi.fn`).
- **Måltäckning (80%):** Vi siktar på **minst 80% testtäckning** för att garantera stabilitet i kritiska flöden och vanliga edge cases utan att överarbeta oviktiga detaljer.

---

## 4. Struktur & Namngivningskonventioner

Tester placeras i katalogen `/tests` och skrivs med engelska beskrivningar:

```typescript
// Exempel: /tests/unit/formatPrice.spec.ts

describe('formatPrice', () => {
  it('should format SEK correctly with standard decimals', () => {
    // Testlogik här
  });

  it('should return an error for invalid input types', () => {
    // Testlogik här
  });
});
```

- **Mappstruktur:** Alla tester placeras under `/tests` (t.ex. `/tests/unit`, `/tests/components`, `/tests/e2e`).
- **`describe`-block:** Ska ange namnet på funktionen eller komponenten som testas (t.ex. `describe('formatPrice', ...)`).
- **`it`-block:** Ska inledas med **`should`** följt av förväntat utfall (t.ex. `it('should return an error for...')`).
- **Språk:** Svenska i dokumentation – **engelska** i testkod och testbeskrivningar.

---

## 5. Vad vi medvetet _inte_ testar

För att undvika bräckliga tester och onödig underhållsbörda testar vi inte:

1. **Tredjepartspaket / Externa bibliotek:** Vi utgår från att externa moduler är testade av sina maintainers.
2. **Ren CSS / Styling:** Visuella detaljer ändras ofta och verifieras manuellt eller via designgranskning.
3. **Strikt DOM-ordning:** Undvik att testa exakt HTML-nodstruktur (använd istället semantiska selectors, roller och test-id).

---

## 6. Snabbkommandon

```bash
# Kör alla enhets- och komponenttester i watch mode
npm test

# Kör alla enhets- och komponenttester en gång (CI-läge)
npm run test:run

# Öppna Cypress interaktiva testrunner för E2E
npm run cy:open
```
