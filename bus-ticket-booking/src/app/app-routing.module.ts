import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { BusListComponent } from './bus-list/bus-list.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { PassengerInfoComponent } from './passenger-info/passenger-info.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';

const routes: Routes = [
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin', component: AdminInterfaceComponent },
  { path: 'buses', component: BusListComponent },
  { path: 'buses/:busId/seats', component: SeatSelectionComponent },
  {
    path: 'buses/:busId/seats/:seatId/passenger-info',
    component: PassengerInfoComponent,
  },
  { path: 'booking-summary', component: BookingSummaryComponent },
  // Add more routes as needed
  { path: '', redirectTo: '/customer-login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
