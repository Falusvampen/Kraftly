# Beslut: feature flags

**Datum:** 2026-09-24
**Beslut:** (en mening: hur Kraftly slår på och av funktioner per miljö)

## Bakgrund

(Norge-expansionen: ska finnas i staging, inte synas för kunder. Vad krävde det?)

## Alternativ vi jämförde

| Alternativ                            | Hur | Bryter det mot "bygg en gång"? | Nackdel |
| ------------------------------------- | --- | ------------------------------ | ------- |
| Långlivad branch                      |     |                                |         |
| Byggtidsflagga (`VITE_…`)             |     |                                |         |
| Körtidsflagga (`config.js` vid start) |     |                                |         |

## Motivering

(Varför det vi valde. Raden som avgör är kolumnen "bygg en gång".)

## Konsekvenser

(Vad det kostar, t.ex. ett ställe till att konfigurera per miljö. När flaggan ska bort, och vem som ser till det.)
