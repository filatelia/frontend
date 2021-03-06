// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  conect_url: 'https://api.filateliaperu.com/',
  conect_url_api: 'https://api.filateliaperu.com/api',
  CHAT_URL:location.protocol=='http:'?"ws://sw-filatelia.herokuapp.com/":"wss://sw-filatelia.herokuapp.com/",

  // conect_url: 'http://localhost:3000',
  // conect_url_api: 'http://localhost:3000/api',
  // CHAT_URL:"ws://192.168.104.94:5000/",

  
  
  api: '/api',
  login: '/login',
  api_login: '/login',
  api_signup: '/usuarios'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
