// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // SSR doesn't work with self-signed certificates
  // occBaseUrl: 'http://localhost:9001',
  occBaseUrl: 'https://api.ct075nck5-franketec1-s1-public.model-t.cc.commerce.ondemand.com',
};
