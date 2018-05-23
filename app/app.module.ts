import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import {PassengerDashboardModule} from './passenger-dashboard/passenger-dashboard.module'
import { AppComponent } from './app.component';  // base component used in index.html


@NgModule({
  declarations: [
    AppComponent              // register Components for use in this module AppModule
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    CommonModule,
    // Custom Modules
    PassengerDashboardModule
  ],
  bootstrap: [AppComponent]   // use AppComponent as root component
})
export class AppModule {}