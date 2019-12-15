/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Amplify from 'aws-amplify';

if (environment.production) {
  enableProdMode();
}

Amplify.configure({
  Auth:{
    identityPoolId:"ap-south-1:28cf10b9-de60-4437-9f6f-6bd2499fdae9",
    region:"ap-south-1",
    userPoolId:"ap-south-1_G4A3Bh3Ch",
    userPoolWebClientId:"1q27n71jrudu3hk4f1qt7h297d",
    // cookieStorage: {
    //   domain: "localhost",
    //   secure: false
    // }
  },
  // Storage:{
  //   AWSS3:{
  //     bucket:"hospiton-images",
  //     region:"ap-south-1"
  //   }
  // }
})

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
