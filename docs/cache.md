# Performance Testing

Dokumentation av belastningstester med Autocannon mot applikationen.

---

## Testkörning 1 (Tidigare baseline)

Kördes lokalt mot Docker med 50 anslutningar i 10 sekunder, samt mot Staging med 10 anslutningar.

### Frontend

**URL:** `http://localhost:8080/`

| Metric                  | Value   |
| ----------------------- | ------- |
| Average latency         | 7.77 ms |
| 99th percentile latency | 15 ms   |
| Average requests/sec    | 8 502   |
| Total requests          | 85 000  |
| Data transferred        | 60.6 MB |
| Errors                  | 50      |

### Static Asset

**URL:** `http://localhost:8080/assets/index-REEjzLaC.js`

| Metric                  | Value   |
| ----------------------- | ------- |
| Average latency         | 8.05 ms |
| 99th percentile latency | 18 ms   |
| Average requests/sec    | 8 380   |
| Total requests          | 84 000  |
| Data transferred        | 59.7 MB |
| Errors                  | 50      |

_Notering: 59,7 MB för 84 000 anrop motsvarar ca 710 byte/anrop. Anropet träffade Nginx SPA-fallback (`index.html`) då hashen inte existerade i containern och explicit `location /assets/`-block saknades i mallen._

### API Endpoint

**URL:** `http://localhost:8080/api/user`

| Metric                  | Value    |
| ----------------------- | -------- |
| Average latency         | 49.43 ms |
| 99th percentile latency | 99 ms    |
| Average requests/sec    | 988      |
| Total requests          | 10 000   |
| Data transferred        | 3.9 MB   |
| Errors                  | 0        |

### Staging Environment

**URL:** `https://kraftly-volt-staging.onrender.com/`

| Metric                  | Value    |
| ----------------------- | -------- |
| Average latency         | 42.64 ms |
| 99th percentile latency | 63 ms    |
| Average requests/sec    | 232      |
| Total requests          | 2 000+   |
| Data transferred        | 2.05 MB  |
| Errors                  | 0        |

---

## Testkörning 2 (Verifiering efter mall- och asset-fix)

Kördes lokalt mot Docker med 50 anslutningar i 10 sekunder (`npx autocannon -c 50 -d 10`) efter att Nginx-templaten uppdaterats med explicita cache-block samt anrop mot aktiv bundle-hash.

### Sammanställning Test 2

| Endpoint                        | Req/s (avg) | p99 Latency | Totalt anrop | Överförd data | Fel | Kommentar                                                                  |
| :------------------------------ | ----------: | ----------: | -----------: | ------------: | --: | :------------------------------------------------------------------------- |
| `GET /`                         |      20 694 |       14 ms |      207 000 |        153 MB | 200 | Avg latency: 5.75 ms. Fel beror på socket contention vid >20k req/s        |
| `GET /assets/index-D4ax2Kkr.js` |       2 356 |       35 ms |       24 000 |       9.33 GB |   0 | Avg latency: 20.93 ms. Faktisk bundle (~398 kB/req), tak i I/O (~930 MB/s) |
| `GET /api/user`                 |         721 |       76 ms |        7 000 |       2.85 MB |   0 | Avg latency: 22.90 ms. Proxyväg mot mock-API                               |
