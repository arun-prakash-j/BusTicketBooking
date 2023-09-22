import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private buses = [
    {
      id: '1',
      busNumber: 'Bus-001',
      departureTime: '10:00 AM',
      destination: 'Destination A',
    },
    {
      id: '2',
      busNumber: 'Bus-002',
      departureTime: '11:30 AM',
      destination: 'Destination B',
    },
    {
      id: '3',
      busNumber: 'Bus-003',
      departureTime: '1:00 PM',
      destination: 'Destination C',
    },
  ];

  constructor() {}

  // Method to get the list of available buses
  getAvailableBuses() {
    return this.buses;
  }

  // Method to get a specific bus by ID
  getBusById(id: string) {
    return this.buses.find((bus) => bus.id === id);
  }
}
