// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sportsDB: "https://www.thesportsdb.com/api/v1/json/1/",
  firebaseConfig:{
    apiKey: "AIzaSyA-vWR4N6tlRcC1FhXO5SdjmijxQ3_f_4Y",
    authDomain: "bord-manbets.firebaseapp.com",
    databaseURL: "https://bord-manbets.firebaseio.com",
    projectId: "bord-manbets",
    storageBucket: "",
    messagingSenderId: "323329185904",
    appId: "1:323329185904:web:f4fe3440c86531c6743cb5",
    measurementId: "G-DCHHXV09CQ"
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
