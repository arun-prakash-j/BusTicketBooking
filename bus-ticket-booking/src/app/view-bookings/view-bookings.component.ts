import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent {
  constructor(private router: Router) {}
  backToAdminInterface() {
    this.router.navigate(['/admin-interface']);
  }
}
