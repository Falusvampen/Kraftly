# Deploy – Kraftly Mina sidor

## Flödet

(Mermaid-diagram: PR → CI → merge → publish → deploy-staging → Render → verifiering)

## Miljöer

| Miljö | URL | Image | API | Uppdateras |

## Konfiguration – var bor vad?

| Variabel | Hemlig? | Lokalt | Staging | Används av |
(API_KEY, API_URL, PORT, RENDER_DEPLOY_HOOK, STAGING_URL, GITHUB_TOKEN)

## API-nyckeln

Vad hände med den gamla, varför den är död (curl-utskriften med 401), var den nya ligger.
Skrev ni om historiken? Varför / varför inte?

## Rollback

Två sätt, steg för steg. Hur ni kontrollerar att det lyckades.

## Tider (uppmätta)

| Steg | Tid |
(merge → publish klar · hook → rätt sha svarar · totalt · kallstart)

## Kända begränsningar

(kallstart, vem som äger Render-kontot, arm64 vs amd64, ingen prod ännu)

## Screenshot

![screenshot](docs/images/curl_api_test.png)
