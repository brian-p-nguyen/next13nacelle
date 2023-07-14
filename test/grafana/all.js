import { check, sleep } from 'k6';
import http from 'k6/http'

// See https://k6.io/docs/using-k6/options
export const options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '1m', target: 100 },
    { duration: '1m', target: 100 },
  ]
}

export default function main() {
  const responses = http.batch([
    ['GET', 'https://next13nacelle.vercel.app/products/nocachenacelle/otto-shirt', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://next13nacelle.vercel.app/products/nacelle/otto-shirt', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://next13nacelle.vercel.app/products/nacellemulti/otto-shirt', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://next13nacelle.vercel.app/products/nacellecache/otto-shirt', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://next13nacelle.vercel.app/products/nocachenonacelle/otto-shirt', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://next13nacelle.vercel.app/products/nonacelle/otto-shirt', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://next13nacelle.vercel.app/products/nonacellecache/otto-shirt', null, { tags: { ctype: 'html' } }],
  ]);

  // Check if the response was successful
  check(responses[0], {
    'is status 200': (r) => r.status === 200,
  });
  check(responses[1], {
    'is status 200': (r) => r.status === 200,
  });
  check(responses[2], {
    'is status 200': (r) => r.status === 200,
  });
  check(responses[3], {
    'is status 200': (r) => r.status === 200,
  });
  check(responses[4], {
    'is status 200': (r) => r.status === 200,
  });
  check(responses[5], {
    'is status 200': (r) => r.status === 200,
  });
  check(responses[6], {
    'is status 200': (r) => r.status === 200,
  });

//   // Log the response time
//   const responseTime1 = responses[0].timings.duration;
//   const responseTime2 = responses[1].timings.duration;
//   const responseTime3 = responses[2].timings.duration;
//   const responseTime4 = responses[3].timings.duration;
//   const responseTime5 = responses[4].timings.duration;
//   const responseTime6 = responses[5].timings.duration;

//   console.log(`No Next13 Cache Nacelle Response time: ${responseTime1} ms`);
//   console.log(`Nacelle Response time: ${responseTime2} ms`);
//   console.log(`Nacelle Cache Response time: ${responseTime3} ms`);
//   console.log(`No Next13 Cache No Nacelle Response time: ${responseTime4} ms`);
//   console.log(`No Nacelle Response time: ${responseTime5} ms`);
//   console.log(`No Nacelle Cache Response time: ${responseTime6} ms`);

  sleep(3); // Wait for 3 seconds between requests
}