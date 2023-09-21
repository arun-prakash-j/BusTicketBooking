import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { PassengerInfoComponent } from './passenger-info/passenger-info.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';

@NgModule({
  declarations: [AppComponent, CustomerLoginComponent, AdminLoginComponent, AdminInterfaceComponent, BusListComponent, SeatSelectionComponent, PassengerInfoComponent, BookingSummaryComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
