// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  prerenderUrl: 'http://localhost:4000',
  appName: 'NumberOneGirl',
  firebaseConfig: {
    apiKey: 'AIzaSyCTtjO_fL_4qO5CVv1ap08TWUhIh9qugiw',
    authDomain: 'number-one-girl.firebaseapp.com',
    databaseURL: 'https://number-one-girl.firebaseio.com',
    projectId: 'number-one-girl',
    storageBucket: 'number-one-girl.appspot.com',
    messagingSenderId: '731935211028',
    appId: '1:731935211028:web:4439abdb0eb386ee013101',
    measurementId: 'G-LYNLKYNQ2Y'
  },
  stripePublishableKey: 'pk_test_nweoKA23xTM9rYZPjfbV4ZvY',
};
