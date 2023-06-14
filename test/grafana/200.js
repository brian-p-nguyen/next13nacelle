import { check, sleep } from 'k6';
import http from 'k6/http'

// See https://k6.io/docs/using-k6/options
export const options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '1m', target: 0 },
  ]
}

export default function main() {
  const response = http.get('https://next13nacelle.vercel.app/products/nacellecache/otto-shirt'); // Replace with your website URL

  // Check if the response was successful
  check(response, {
    'is status 200': (r) => r.status === 200,
  });

  // Record the response time
  const responseTime = response.timings.duration;
  console.log(`Response time: ${responseTime} ms`);

  sleep(3); // Wait for 3 seconds between requests (adjust as needed)
}