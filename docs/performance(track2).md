# Prestanda

## Så mäter vi

JavaScript mäts som gzip-storlek från `npm run build`. Bundle-strukturen
verifieras med `npx vite-bundle-visualizer`.

## Budgeten

| Mått       |       Budget | Var            | Varför just den                                   |
| ---------- | -----------: | -------------- | ------------------------------------------------- |
| JavaScript | ≤ 45 kB gzip | Initial bundle | Login ska inte ladda kod för vyer som inte visas. |

## Optimeringarna

### 1. Lazy routes

Problemet var att alla vyer importerades statiskt i
[src/router/index.js](../src/router/index.js). Det gjorde att login laddade
dashboard-, faktura-, flytt- och profilkod trots att den inte visade någon av
dem. Vi bytte till dynamiska importer så att varje vy byggs som en egen chunk.
Lazy routes var inte implementerat före denna ändring.

|                                  |                    Före |                  Efter |
| -------------------------------- | ----------------------: | ---------------------: |
| JavaScript gzip i initial bundle |               143,53 kB |               41,28 kB |
| Login-vy                         | Ingick i initial bundle |  1,09 kB separat chunk |
| Dashboard-vy                     | Ingick i initial bundle | 51,73 kB separat chunk |

### 2. Ta bort Lodash

Problemet var att [DashboardView.vue](../src/views/DashboardView.vue) laddade
hela Lodash för endast `debounce`. Vi ersatte importen med den lokala
[debounce-hjälpfunktionen](../src/utils/debounce.js) och tog bort Lodash som
direkt dependency.

|                              | Före                     | Efter               |
| ---------------------------- | ------------------------ | ------------------- |
| Lodash i applikationskoden   | `import _ from 'lodash'` | Ingen Lodash-import |
| Direkt produktionsdependency | `lodash`                 | Ingen               |

Transitiva Lodash-kopior finns fortfarande via utvecklingsverktyg, men de
används inte av produktionsbygget.

### 3. Begränsa Chart.js

Problemet var att [ConsumptionChart.vue](../src/components/ConsumptionChart.vue)
importerade `chart.js/auto`, vilket registrerar hela Chart.js. Vi importerar och
registrerar endast `Chart`, `BarController`, `BarElement`, `CategoryScale`,
`LinearScale` och `Tooltip`, eftersom dashboarden bara ritar ett stapeldiagram.

|                         |            Före |                           Efter |
| ----------------------- | --------------: | ------------------------------: |
| Initial JavaScript gzip |       143,53 kB |                        41,28 kB |
| Chart.js-import         | `chart.js/auto` | Namngivna delar från `chart.js` |

Testmocken uppdaterades samtidigt i
[ConsumptionChart.spec.js](../tests/Component/ConsumptionChart.spec.js), så
Chart.js-testet kör utan `Not implemented: HTMLCanvasElement's getContext()`-raden.

## Build-resultat

Kommandot var `npm run build`.

### Före

| JavaScript-fil                  |   Storlek |      Gzip |
| ------------------------------- | --------: | --------: |
| `dist/assets/index-CmhVsr0Z.js` | 396,78 kB | 143,53 kB |

### Efter

| JavaScript-fil                                      |   Storlek |     Gzip |
| --------------------------------------------------- | --------: | -------: |
| `dist/assets/_plugin-vue_export-helper-DlAUqK2U.js` |   0,09 kB |  0,10 kB |
| `dist/assets/user-Jh1COfug.js`                      |   0,28 kB |  0,22 kB |
| `dist/assets/InvoicesView-CZYHwJmi.js`              |   1,26 kB |  0,69 kB |
| `dist/assets/ProfileView-DY2KMyTP.js`               |   1,59 kB |  0,87 kB |
| `dist/assets/LoginView-c9_GhIWF.js`                 |   1,72 kB |  1,09 kB |
| `dist/assets/MoveFormView-Bqf_tG93.js`              |   4,32 kB |  2,01 kB |
| `dist/assets/index-MNuKRDZP.js`                     | 104,98 kB | 41,28 kB |
| `dist/assets/DashboardView-B5zUyLPs.js`             | 146,18 kB | 51,73 kB |

`npx vite-bundle-visualizer` kördes före och efter optimeringarna.

## Verifiering

- `npm run build` — godkänd.
- `npx vite-bundle-visualizer` — körd före och efter optimeringarna.
- `npm run test:run` — 39/39 tester gröna.
- `npm run lint` — godkänd utan fel; sex befintliga varningar.
