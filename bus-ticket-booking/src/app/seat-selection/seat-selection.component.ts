import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { SeatService } from '../services/seat.service';
import { Seat } from '../shared/seat.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent {
  selectedBusId: string = '';
  selectedSeats: Seat[] = [];
  totalFare: number = 0;

  seats: Seat[] = [];
  lowerDeckSeats: Seat[] = [];
  upperDeckSeats: Seat[] = [];

  seaterPrices: number[] = [];
  sleeperPrices: number[] = [];

  seaterCount: number = 0;
  sleeperCount: number = 0;
  seaterPrice: number = 0;
  sleeperPrice: number = 0;

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private seatService: SeatService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedBusId = params['busNo'];

      // Preserving the seat colours
      const selectedSeatIdsJson = localStorage.getItem('selectedSeats');
      const selectedSeatIds = selectedSeatIdsJson
        ? JSON.parse(selectedSeatIdsJson)
        : [];

      if (selectedSeatIds.length > 0) {
        this.selectedSeats = this.seats.filter((seat) =>
          selectedSeatIds.includes(String(seat.id))
        );
      }

      if (this.selectedBusId) {
        const firebasePath = `/Seats/${this.selectedBusId}`;

        this.db
          .object(firebasePath)
          .valueChanges()
          .subscribe((busSeatsData: any) => {
            if (busSeatsData) {
              this.lowerDeckSeats = busSeatsData.lowerDeck;
              this.upperDeckSeats = busSeatsData.upperDeck;
              console.log(this.lowerDeckSeats);
              this.calculateSeatPrices();
            }
          });
      }
    });
  }

  calculateSeatPrices(): void {
    const seaterPricesRef = `/Seats/${this.selectedBusId}/lowerDeck`;
    this.db
      .object(seaterPricesRef)
      .valueChanges()
      .subscribe((seaterPricesData: any) => {
        if (seaterPricesData) {
          const seaterPrices = Object.values(seaterPricesData) as number[];
          console.log('sfasfs', seaterPricesData['0'].price);
          this.seaterPrices = seaterPrices || [];
          this.seaterCount = this.selectedSeats.filter(
            (seat) => seat.type === 'seater'
          ).length;
          this.calculateTotal();
        }
      });

    const sleeperPricesRef = `/Seats/${this.selectedBusId}/upperDeck`;
    this.db
      .object(sleeperPricesRef)
      .valueChanges()
      .subscribe((sleeperPricesData: any) => {
        if (sleeperPricesData) {
          const sleeperPrices = Object.values(sleeperPricesData) as number[];
          this.sleeperPrices = sleeperPrices || [];
          this.sleeperCount = this.selectedSeats.filter(
            (seat) => seat.type === 'sleeper'
          ).length;
          this.calculateTotal();
        }
      });
  }

  selectSeat(seat: Seat): void {
    if (!seat.isBooked) {
      const selectedSeatIds = this.seatService.getSelectedSeatNumbers();

      if (selectedSeatIds.length < 5 || seat.isSelected) {
        seat.isSelected = !seat.isSelected;
        if (seat.isSelected) {
          this.seatService.addSelectedSeatNumber(String(seat.id));
        } else {
          this.seatService.removeSelectedSeatNumber(String(seat.id));
        }
        // localStorage.setItem(
        //   'selectedSeats',
        //   JSON.stringify(this.seatService.getSelectedSeatNumbers())
        // );
        this.calculateTotal();
      } else {
        // Display an error message or take appropriate action
        console.log('Maximum seat limit (5) reached');
      }

      this.saveSelectedSeatsToLocalStorage();
    }
  }

  saveSelectedSeatsToLocalStorage(): void {
    const selectedSeatIds = this.selectedSeats.map((seat) => String(seat.id));
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIds));
  }

  calculateTotal(): void {
    this.totalFare = this.selectedSeats.reduce((total, seat) => {
      return (
        total +
        (seat.type === 'seater'
          ? this.seaterPrices[seat.id] || 0
          : this.sleeperPrices[seat.id] || 0)
      );
    }, 0);
  }

  getSeatColor(seat: Seat): string {
    if (seat.isBooked) {
      return seat.gender === 'male' ? 'gray' : 'pink';
    }
    return seat.isSelected ? 'green' : 'white';
  }

  proceedToPassengerInfo() {
    const selectedSeatIds = this.seatService.getSelectedSeatNumbers();
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIds));

    console.log('Selected Seats', selectedSeatIds);
    this.router.navigate([
      'buses',
      this.selectedBusId,
      'seats',
      selectedSeatIds.join(','),
      'passenger-info',
    ]);
  }
}
