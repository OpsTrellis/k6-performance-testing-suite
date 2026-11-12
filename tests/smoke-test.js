import http from 'k6/http';
import { check, sleep } from 'k6';
import { standardThresholds } from '../src/config/thresholds.js';

export const options = {
  vus: 3,
  duration: '30s',
  thresholds: standardThresholds,
};

const BASE_URL = __ENV.TARGET_URL || 'https://quickpizza.grafana.com';

export default function () {
  const res = http.get(`${BASE_URL}/`);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response body received': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}
