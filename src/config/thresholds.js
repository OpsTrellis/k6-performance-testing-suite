/**
 * Enterprise Performance SLA Thresholds
 * Defined by OpsTrellis (https://opstrellis.com)
 */

export const standardThresholds = {
  // 95% of requests must complete below 400ms, 99% below 800ms
  http_req_duration: ['p(95)<400', 'p(99)<800'],
  // HTTP failure rate must stay below 1%
  http_req_failed: ['rate<0.01'],
};

export const strictApiThresholds = {
  http_req_duration: ['p(95)<250', 'p(99)<500'],
  http_req_failed: ['rate<0.005'],
};
