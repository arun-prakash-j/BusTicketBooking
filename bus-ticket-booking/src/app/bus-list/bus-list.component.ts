import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BusService } from '../services/bus.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css'],
})
export class BusListComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  buses: any[] = [];

  constructor(
    private busService: BusService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    // Fetch the list of available buses using the BusService
    this.buses = this.busService.getAvailableBuses();
  }

  logout() {
    this.firebaseService.logout();
    this.isLogout.emit();
    this.router.navigate(['/customer-login']);
  }

  viewSeats(busId: string) {
    // Navigate to the seat selection page with the selected bus information
    this.router.navigate(['/buses', busId, 'seats']);
  }
}
