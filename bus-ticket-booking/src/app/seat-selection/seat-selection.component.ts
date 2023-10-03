import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SeatService } from '../services/seat.service';
import { Seat } from '../shared/seat.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent implements OnInit {
  selectedBusId: string = '';
  selectedSeatIds: Seat[] = [];
  totalFare: number = 0;
  lowerDeckSeats: Seat[] = [];
  upperDeckSeats: Seat[] = [];

  noSeatsSelected: boolean = true;

  totalPrice: number = 0;

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private seatService: SeatService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedBusId = params['busNo'];

      if (this.selectedBusId) {
        const firebasePath = `/Seats/${this.selectedBusId}`;

        this.db
          .object(firebasePath)
          .valueChanges()
          .subscribe((busSeatsData: any) => {
            if (busSeatsData) {
              this.lowerDeckSeats = busSeatsData.lowerDeck;
              this.upperDeckSeats = busSeatsData.upperDeck;
            }
          });
      }
    });
  }

  selectSeat(seat: Seat): void {
    if (!seat.isBooked) {
      if (this.selectedSeatIds.length < 5 || seat.isSelected) {
        seat.isSelected = !seat.isSelected;

        if (seat.isSelected) {
          this.seatService.addSelectedSeatNumber(seat);
        } else {
          this.seatService.removeSelectedSeatNumber(seat);
        }

        this.selectedSeatIds = this.seatService.getSelectedSeatNumbers();

        this.calculateTotal();
      } else {
        console.log('Maximum seat limit (5) reached');
      }
    }
    this.noSeatsSelected = this.selectedSeatIds.length === 0;
  }

  calculateTotal(): void {
    this.totalPrice = this.selectedSeatIds.reduce(
      (total, seat) => total + seat.price,
      0
    );
  }

  getSeatColor(seat: Seat): string {
    if (seat.isBooked) {
      return seat.gender === 'male' ? 'lightblue' : 'pink';
    }

    if (
      this.isSeatBooked(seat) ||
      this.isAdjacentSeatBooked(seat, -1) ||
      this.isAdjacentSeatBooked(seat, 1)
    ) {
      return 'pink'; // Highlight if the seat or adjacent seats are booked
    }

    return seat.isSelected ? 'green' : 'white';
  }

  isSeatBooked(seat: Seat | undefined): boolean {
    return seat ? seat.isBooked : false;
  }

  isAdjacentSeatBooked(seat: Seat, offset: number): boolean {
    if (!seat || !seat.id) {
      return false;
    }

    // Determine the maximum seat number in a row (e.g., 2 for your example layout)
    const seatsPerRow = 2;

    // Calculate the row number based on the seat number and seats per row
    const currentRow = Math.floor(seat.id / seatsPerRow);

    // Calculate the adjacent seat number in the same row
    const adjacentSeatInRow = seat.id + offset;

    // Check if the adjacent seat is booked in the same deck and row
    const isAdjacentSeatBooked =
      seat.deck === 'lowerDeck'
        ? this.lowerDeckSeats.some(
            (s) =>
              s.id === adjacentSeatInRow &&
              Math.floor(s.id - 1/ seatsPerRow) === currentRow &&
              s.isBooked
          )
        : this.upperDeckSeats.some(
            (s) =>
              s.id === adjacentSeatInRow &&
              Math.floor(s.id / seatsPerRow) === currentRow &&
              s.isBooked
          );

    return isAdjacentSeatBooked;
  }

  proceedToPassengerInfo() {
    this.router.navigate([
      'buses',
      this.selectedBusId,
      'seats',
      'passenger-info',
    ]);
  }
}
