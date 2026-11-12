import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Initial load
    { duration: '3m', target: 300 }, // Heavy stress
    { duration: '2m', target: 500 }, // Breaking point test
    { duration: '3m', target: 0 },   // Recovery
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1500'],
  },
};

const BASE_URL = __ENV.TARGET_URL || 'https://quickpizza.grafana.com';

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, {
    'system alive': (r) => r.status < 500,
  });
  sleep(0.5);
}
