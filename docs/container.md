# Containrar – Kraftly Mina sidor

## Så kör man

`docker compose up --build` → http://localhost:8080 (Frontend och mock-API via Nginx reverse proxy)

## Imagen

| Version          | Basimage               | Storlek | Byggtid (utan cache) | Byggtid (kodändring) |
| ---------------- | ---------------------- | ------- | -------------------- | -------------------- |
| Naiv (bara Node) | node:22-alpine         |         | ~                    |                      |
| Multi-stage      | nginx:1.27-alpine-slim |         | ~                    | ~                    |

## Beslut 1 · Basimage för frontenden

Vi valde `nginx:1.27-alpine-slim` i stället för standard Node (`node:22`) eller full Nginx (`nginx:latest`).

- **Motivering:** Frontenden är en kompilerad Single Page Application (Vue/Vite) och består enbart av statiska filer (HTML, JS, CSS). Att köra Node.js i produktion vore onödigt resurskrävande.
- **Var vi drog gränsen:** `nginx:1.27-alpine-slim` ger en minimal avbild (långt under DoD-kravet på 100 MB) samtidigt som den innehåller allt som krävs för effektiv statisk filservering och reverse proxy.

## Beslut 2 · Hur mock-API:t körs

Vi valde **egen image via Docker Compose** i stället för bind mount samt har kvar möjligheten för lokal körning utanför Docker.

- **Motivering:** Genom att köra mock-API:et i en egen container (`mock-api/Dockerfile`) med `node:22-alpine`, `--omit=dev` och under icke-root-användaren `node`, isoleras backend helt från utvecklarens lokala Node-miljö.
- **Samarbete via Compose:** `compose.yaml` orkestrerar båda containrarna i samma interna Docker-nätverk. Klonar någon repot på en ren dator krävs endast `docker compose up --build` för att hela systemet ska starta.

## Beslut 3 · Hur browsern når API:t

Vi valde **proxy via Nginx (`/api/`)** i stället för en publicerad port mot värddatorn (`localhost:4000`).

- **Motivering:** Genom att låta Nginx fånga anrop till `/api/` och vidarebefordra dem internt till `http://api:4000` pratar webbläsaren enbart med webbservern på port 8080. Detta eliminerar behovet av CORS och vi slipper publicera port 4000 externt.
- **Konsekvens för vecka 5 (staging utan localhost):** Detta val gör att frontendkoden är helt frikopplad från `localhost`. När appen deployas till molnet behöver källkoden inte ändras eller byggas om med nya miljövariabler – frontenden anropar alltid `/api` relativt till den domän den ligger på, och Nginx sköter dirigeringen till backend via det interna nätverket.

## Vad som körs i CI

I `.github/workflows/ci.yml` körs jobbet `release-image` enbart på main branchen efter att övriga kvalitetstester blivit klara.

- Steget kör `docker build -t kraftly .` för att verifiera att Dockerfilen bygger felfritt i en ren Linux-miljö.
- Avbildens storlek loggas i CI med `docker image ls kraftly --format "{{.Size}}"`.

## Kända begränsningar

- Byggen på macOS (Alltså Apple Silicon) ger en `arm64`-avbild lokalt. För molndriftsättning i M4 behöver bygget anpassas för målplattformen (`linux/amd64`).
