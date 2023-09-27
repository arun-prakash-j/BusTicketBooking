import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.selectedBusId = params['busNo'];

      if (this.selectedBusId) {
        const firebasePath = `/Seats/${this.selectedBusId}`;

        this.db
          .object(firebasePath)
          .valueChanges()
          .subscribe((busSeatsData: any) => {
            console.log(busSeatsData.lowerDeck);
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
    // Retrieve seater prices from Firebase
    const seaterPricesRef = `/Seats/${this.selectedBusId}/lowerDeck`;
    this.db
      .object(seaterPricesRef)
      .valueChanges()
      .subscribe((seaterPricesData: any) => {
        console.log("sfasfs")
        if (seaterPricesData) {
          const seaterPrices = Object.values(seaterPricesData);
        
          // this.seaterPrice = seaterPrices[0] || 0;
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
          const sleeperPrices = Object.values(sleeperPricesData);
          // this.sleeperPrice = sleeperPrices[0] || 0;
          this.sleeperCount = this.selectedSeats.filter(
            (seat) => seat.type === 'sleeper'
          ).length;
          this.calculateTotal();
        }
      });
  }

  selectSeat(seat: Seat): void {
    if (!seat.isBooked) {
      seat.isSelected = !seat.isSelected;

      if (seat.isSelected) {
        this.selectedSeats.push(seat);
      } else {
        this.selectedSeats = this.selectedSeats.filter(
          (selectedSeat) => selectedSeat.id !== seat.id
        );
      }
      console.log(this.selectedSeats);

      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.totalFare = this.selectedSeats.reduce((total, seat) => {
      console.log(total);
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
}
