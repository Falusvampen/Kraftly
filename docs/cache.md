# Performance Testing

## Frontend

**URL:** `http://localhost:8080/`

| Metric                  | Value   |
| ----------------------- | ------- |
| Average latency         | 7.77 ms |
| 99th percentile latency | 15 ms   |
| Average requests/sec    | 8,502   |
| Total requests          | 85,000  |
| Data transferred        | 60.6 MB |
| Errors                  | 50      |

---

## Static Asset

**URL:** `http://localhost:8080/assets/index-REEjzLaC.js`

| Metric                  | Value   |
| ----------------------- | ------- |
| Average latency         | 8.05 ms |
| 99th percentile latency | 18 ms   |
| Average requests/sec    | 8,380   |
| Total requests          | 84,000  |
| Data transferred        | 59.7 MB |
| Errors                  | 50      |

---

## API Endpoint

**URL:** `http://localhost:8080/api/user`

| Metric                  | Value    |
| ----------------------- | -------- |
| Average latency         | 49.43 ms |
| 99th percentile latency | 99 ms    |
| Average requests/sec    | 988      |
| Total requests          | 10,000   |
| Data transferred        | 3.9 MB   |
| Errors                  | 0        |

---

## Staging Environment

**URL:** `https://kraftly-volt-staging.onrender.com/`

| Metric                  | Value    |
| ----------------------- | -------- |
| Average latency         | 42.64 ms |
| 99th percentile latency | 63 ms    |
| Average requests/sec    | 232      |
| Total requests          | 2,000+   |
| Data transferred        | 2.05 MB  |
| Errors                  | 0        |

---

- Environment Avg Latency Req/Sec
- Local Frontend 7.77 ms 8,502
- Local API 49.43 ms 988
- Render Staging 42.64 ms 232
