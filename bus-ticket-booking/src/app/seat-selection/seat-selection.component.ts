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
  selectedSeats: Seat[] = [];
  selectedSeatIds: Seat[] = [];
  totalFare: number = 0;
  lowerDeckSeats: Seat[] = [];
  upperDeckSeats: Seat[] = [];
  // seaterPrices: number[] = [];
  // sleeperPrices: number[] = [];
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
    this.totalPrice = this.selectedSeatIds.reduce((total, seat) => total + seat.price, 0);
  }

  getSeatColor(seat: Seat): string {
    if (seat.isBooked) {
      return seat.gender === 'male' ? 'lightblue' : 'pink';
    }
    return seat.isSelected ? 'green' : 'white';
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
