import { Component, OnInit } from '@angular/core';
import { BusService } from '../services/bus.service';
import { Router } from '@angular/router';

import { getDatabase } from 'firebase/database';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css'],
})
export class BusListComponent implements OnInit {
  buses: any[] = [];

  database = getDatabase();

  constructor(private busService: BusService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the list of available buses using the BusService
    this.buses = this.busService.getAvailableBuses();
  }

  viewSeats(busId: string) {
    // Navigate to the seat selection page with the selected bus information
    this.router.navigate(['/buses', busId, 'seats']);
  }
}
