import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'http://localhost:3000';
const rateMetric = new Rate('failed_requests');

export default function () {
  const res = http.get(`${BASE_URL}/rate`);

  const isSuccessful = check(res, {
    isResponseTimeBelow200ms: (r) => r.timings.duration < 200,
    isStatus200: (r) => r.status === 200,
  });

  rateMetric.add(!isSuccessful);

  sleep(1);
}
