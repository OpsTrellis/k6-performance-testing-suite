import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { standardThresholds } from '../src/config/thresholds.js';
import { generateUserPayload } from '../src/fixtures/payloads.js';

export const options = {
  stages: [
    { duration: '1m', target: 20 },  // Ramp-up to 20 users
    { duration: '3m', target: 50 },  // Steady state 50 users
    { duration: '1m', target: 100 }, // Peak surge 100 users
    { duration: '1m', target: 0 },   // Graceful ramp-down
  ],
  thresholds: standardThresholds,
};

const BASE_URL = __ENV.TARGET_URL || 'https://quickpizza.grafana.com';

export default function () {
  group('Homepage & Catalog Flow', () => {
    const homeRes = http.get(`${BASE_URL}/`);
    check(homeRes, {
      'homepage status 200': (r) => r.status === 200,
      'latency < 400ms': (r) => r.timings.duration < 400,
    });
    sleep(1);

    const payload = JSON.stringify(generateUserPayload());
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const apiRes = http.post(`${BASE_URL}/api/pizza`, payload, params);
    check(apiRes, {
      'api responded': (r) => r.status === 200 || r.status === 201 || r.status === 404,
    });
    sleep(2);
  });
}
