// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //baseUri: "http://localhost:9762/api",
  //baseUri: "https://172.20.55.45:2081/api/",  
  baseUri: "http://localhost:9762/api", //prod
  //baseUri: "http://192.168.43.172/ewmsAPIOlmeca/api",
  version: "0",
  defaultLang: 'ES',
  publicCodCompany: '01',
  sEnviroment: 'DEV',
  appInsights: {
    instrumentationKey: 'ae74a7b2-5d4d-437e-abcf-13dec2107e73'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
