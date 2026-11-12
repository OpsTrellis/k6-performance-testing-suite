# k6 Performance & Load Testing Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![k6](https://img.shields.io/badge/k6-v0.50%2B-7D64FF.svg)](https://k6.io/)
[![Grafana](https://img.shields.io/badge/Grafana-Live%20Dashboard-F46800.svg)](https://grafana.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)

An enterprise-ready, modular **k6 performance testing framework** with predefined SLA thresholds, smoke/load/stress profiles, and turnkey **Docker Compose + InfluxDB + Grafana** live telemetry.

Maintained with ❤️ by [OpsTrellis](https://opstrellis.com) — Engineering-driven QA, Load Testing, and Observability.

---

## 📊 Overview

- **Smoke Testing (`tests/smoke-test.js`)**: Fast 30-second verification before merging pull requests.
- **Load Testing (`tests/load-test.js`)**: Ramp-up from 0 to 100 concurrent virtual users (VUs) to measure sustained p95 and p99 response times.
- **Stress & Soak Testing (`tests/stress-test.js`)**: Extreme load ramp-up to 500 VUs to determine system breaking points, connection pooling exhaustion, and recovery behavior.
- **Dockerized Observability**: Pre-configured `docker-compose.yml` that streams k6 metrics in real time into InfluxDB and renders them on an interactive Grafana dashboard.

---

## ⚡ Quick Start

### 1. Prerequisites
Install k6 locally ([official instructions](https://k6.io/docs/get-started/installation/)):
```bash
# macOS
brew install k6

# Windows (winget or choco)
winget install k6 --source winget
# or
choco install k6

# Linux (Debian/Ubuntu)
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update && sudo apt-get install k6
```

### 2. Run Locally
```bash
# Run quick sanity check
k6 run tests/smoke-test.js

# Run full load test with custom target URL
TARGET_URL="https://your-api.com" k6 run tests/load-test.js
```

---

## 📈 Real-Time Grafana Telemetry via Docker

To view live graphs of RPS, virtual users, and p95 latency:

```bash
docker compose up -d influxdb grafana
k6 run --out influxdb=http://localhost:8086/k6 tests/load-test.js
```

Open your browser to `http://localhost:3001` (user: `admin`, pass: `admin`) to view the real-time metrics.

---

## 🎯 SLA Thresholds Configuration

Thresholds are centrally defined in `src/config/thresholds.js`:

```javascript
export const standardThresholds = {
  // 95% of requests must complete below 400ms, 99% below 800ms
  http_req_duration: ['p(95)<400', 'p(99)<800'],
  // HTTP failure rate must stay below 1%
  http_req_failed: ['rate<0.01'],
};
```

If any threshold is violated, k6 exits with non-zero code, failing your CI/CD pipeline immediately.

---

## 🤝 Need Production Performance Engineering?

OpsTrellis designs scalable automated testing pipelines, API contract validation, and high-concurrency load testing for SaaS and enterprise platforms.

- **Explore Services**: [OpsTrellis Custom Software & QA Engineering](https://opstrellis.com/services/custom-software-development/)
- **Contact Us**: [https://opstrellis.com/contact/](https://opstrellis.com/contact/)

---

## 📄 License

MIT License. Copyright (c) 2026 OpsTrellis.

