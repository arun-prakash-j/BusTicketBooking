import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { filter, map, Observable } from 'rxjs';
import { Seat } from '../shared/seat.model';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  private selectedSeatNumbers: string[] = [];

  constructor() {}

  addSelectedSeatNumber(seatNumber: string) {
    this.selectedSeatNumbers.push(seatNumber);
  }

  removeSelectedSeatNumber(seatNumber: string) {
    this.selectedSeatNumbers = this.selectedSeatNumbers.filter(
      (number) => number !== seatNumber
    );
  }

  getSelectedSeatNumbers() {
    return this.selectedSeatNumbers;
  }
}
