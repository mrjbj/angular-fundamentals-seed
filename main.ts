/// AppComponent 
//      specifies <app-root> as selector in app.component.ts
//      <app-root> is used in index.html
//  AppModule
//      imports AppComponent and registers it as [bootstrap] component for module 

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // to compile js on client side

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

