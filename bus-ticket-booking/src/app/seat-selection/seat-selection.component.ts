import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Seat } from '../shared/seat.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent {
  // seat: any;
  // seatData: any[] = [];
  // passengerGender: string = '';

  // selectedSeats: Seat[] = [];

  // seats: Seat[] = [
  //   { id: '1', deck: 'lower', type: 'seater', isBooked: false },
  //   { id: '2', deck: 'lower', type: 'seater', isBooked: true },
  //   { id: '3', deck: 'lower', type: 'seater', isBooked: false },
  //   { id: '4', deck: 'lower', type: 'seater', isBooked: true },
  //   { id: '5', deck: 'lower', type: 'seater', isBooked: false },
  //   { id: '6', deck: 'lower', type: 'seater', isBooked: true },
  //   { id: '7', deck: 'lower', type: 'seater', isBooked: false },
  //   { id: '8', deck: 'lower', type: 'seater', isBooked: true },
  //   { id: '9', deck: 'lower', type: 'seater', isBooked: false },
  //   { id: '10', deck: 'lower', type: 'seater', isBooked: true },
  //   { id: '11', deck: 'lower', type: 'seater', isBooked: false },
  //   { id: '12', deck: 'lower', type: 'seater', isBooked: true },
  //   { id: '13', deck: 'lower', type: 'seater', isBooked: false },
  //   { id: '14', deck: 'lower', type: 'seater', isBooked: true },
  //   { id: '15', deck: 'lower', type: 'seater', isBooked: false },
  //   { id: '16', deck: 'lower', type: 'seater', isBooked: true },
  //   { id: '17', deck: 'lower', type: 'seater', isBooked: false },
  //   { id: '18', deck: 'lower', type: 'seater', isBooked: true },
  //   { id: '19', deck: 'lower', type: 'sleeper', isBooked: false },
  //   { id: '20', deck: 'lower', type: 'sleeper', isBooked: true },
  //   { id: '21', deck: 'lower', type: 'sleeper', isBooked: false },
  //   { id: '22', deck: 'lower', type: 'sleeper', isBooked: true },
  //   { id: '23', deck: 'lower', type: 'sleeper', isBooked: false },
  //   { id: '24', deck: 'upper', type: 'sleeper', isBooked: true },
  //   { id: '25', deck: 'upper', type: 'sleeper', isBooked: false },
  //   { id: '26', deck: 'upper', type: 'sleeper', isBooked: true },
  //   { id: '27', deck: 'upper', type: 'sleeper', isBooked: false },
  //   { id: '28', deck: 'upper', type: 'sleeper', isBooked: true },
  //   { id: '29', deck: 'upper', type: 'sleeper', isBooked: false },
  //   { id: '30', deck: 'upper', type: 'sleeper', isBooked: true },
  //   { id: '31', deck: 'upper', type: 'sleeper', isBooked: false },
  //   { id: '32', deck: 'upper', type: 'sleeper', isBooked: true },
  //   { id: '33', deck: 'upper', type: 'sleeper', isBooked: false },
  //   { id: '34', deck: 'upper', type: 'sleeper', isBooked: true },
  //   { id: '35', deck: 'upper', type: 'sleeper', isBooked: false },
  //   { id: '36', deck: 'upper', type: 'sleeper', isBooked: true },
  //   { id: '37', deck: 'upper', type: 'sleeper', isBooked: false },
  //   { id: '38', deck: 'upper', type: 'sleeper', isBooked: true },
  // ];

  // lowerDeckSeaterSeats: Seat[] = this.seats.filter(
  //   (seat) => seat.deck === 'lower' && seat.type === 'seater'
  // );

  // // Define lower deck sleeper seats
  // lowerDeckSleeperSeats: Seat[] = this.seats.filter(
  //   (seat) => seat.deck === 'lower' && seat.type === 'sleeper'
  // );

  // // Define upper deck sleeper seats
  // upperDeckSleeperSeats: Seat[] = this.seats.filter(
  //   (seat) => seat.deck === 'upper' && seat.type === 'sleeper'
  // );

  // selectSeat(seat: Seat): void {
  //   if (!seat.isBooked) {
  //     seat.isSelected = !seat.isSelected;
  //     if (seat.isSelected) {
  //       this.selectedSeats.push(seat);
  //     } else {
  //       this.selectedSeats = this.selectedSeats.filter(
  //         (selectedSeat) => selectedSeat.id !== seat.id
  //       );
  //     }
  //   }
  // }

  // // Filter lower deck seater seats
  // getLowerDeckSeaterSeats(): Seat[] {
  //   return this.seats.filter(
  //     (seat) => seat.deck === 'lower' && seat.type === 'seater'
  //   );
  // }

  // // Filter lower deck sleeper seats
  // getLowerDeckSleeperSeats(): Seat[] {
  //   return this.seats.filter(
  //     (seat) => seat.deck === 'lower' && seat.type === 'sleeper'
  //   );
  // }

  // // Filter upper deck sleeper seats
  // getUpperDeckSleeperSeats(): Seat[] {
  //   return this.seats.filter(
  //     (seat) => seat.deck === 'upper' && seat.type === 'sleeper'
  //   );
  // }

  // isAdjacentSeatAvailable(seat: Seat, passengerGender: string): boolean {
  //   const seatId = parseInt(seat.id, 10); // Convert seat ID to a number
  //   if (isNaN(seatId)) {
  //     // Handle the case where seat.id is not a valid number
  //     return false;
  //   }

  //   const adjacentSeat = this.seats.find((s) => {
  //     const adjacentSeatId = parseInt(s.id, 10); // Convert adjacent seat ID to a number
  //     if (isNaN(adjacentSeatId)) {
  //       // Handle the case where s.id is not a valid number
  //       return false;
  //     }
  //     return adjacentSeatId === seatId + 1 || adjacentSeatId === seatId - 1;
  //   });

  //   if (
  //     adjacentSeat &&
  //     adjacentSeat.gender === 'female' &&
  //     passengerGender === 'male'
  //   ) {
  //     return false; // Prevent male passenger from booking next to a female passenger
  //   }

  //   return true; // Allow booking if no adjacent female passenger or if genders are compatible
  // }

  // // isSeatBooked(seatId: string): boolean {
  // //   // Check seat availability based on your seat data
  // //   // Return true if the seat is booked, false otherwise
  // //   const seat = this.seatData.find((seat) => seat.id === seatId);
  // //   return !!seat && seat.isBooked;
  // // }

  // calculateSeatPrice(seat: Seat): number {
  //   if (seat.type === 'seater') {
  //     if (seat.deck === 'lower') {
  //       return 700;
  //     } else {
  //       return 1100; // Upper deck seater
  //     }
  //   } else if (seat.type === 'sleeper') {
  //     if (seat.deck === 'lower') {
  //       return 1200;
  //     } else {
  //       return 1100; // Upper deck sleeper
  //     }
  //   }
  //   return 0; // Default case
  // }

  // constructor(private db: AngularFireDatabase) {}

  // proceedToPassengerInfo(): void {

  // }

  seats: Seat[] = [];

  seaterSeats: Seat[] = [];
  sleeperSeats: Seat[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.db
      .object('/Seats/1')
      .valueChanges()
      .subscribe((bus1SeatsData: any) => {
        //   this.seats = bus1SeatsData;
        //   this.calculateSeatCoordinates();
        // });

        const seats = bus1SeatsData;

        // Assuming the first 20 seats are seater seats and the next 20 are sleeper seats
        this.seaterSeats = seats.slice(0, 20);
        this.sleeperSeats = seats.slice(20, 40);

        // Manually set the coordinates for seater seats
        this.setSeaterSeatCoordinates();

        // Manually set the coordinates for sleeper seats
        this.setSleeperSeatCoordinates();
      });
  }

  setSeaterSeatCoordinates() {
    let xStart = 75; /* starting x coordinate for seater seats in SVG */
    let yStart = 70; /* starting y coordinate for seater seats in SVG */
    const seatWidth = 30; /* width of each seater seat in SVG */
    const seatHeight = 30; /* height of each seater seat in SVG */

    this.seaterSeats.forEach((seat, index) => {
      seat.x = xStart;
      seat.y = yStart;

      // Calculate the next x and y positions based on the seat width
      xStart += seatWidth + 40 /* spacing between seater seats in SVG */;

      // After a row is filled, move to the next row
      if (index % 10 /* number of seater seats per row */ === 0) {
        xStart = 75 /* reset x position for a new row */;
        yStart += seatHeight + 50 /* vertical spacing between rows in SVG */;
      }
    });
  }

  setSleeperSeatCoordinates() {
    //   let xStart = /* starting x coordinate for sleeper seats in SVG */;
    // let yStart = /* starting y coordinate for sleeper seats in SVG */;
    // const seatWidth = /* width of each sleeper seat in SVG */;
    // const seatHeight = /* height of each sleeper seat in SVG */;
    // this.sleeperSeats.forEach((seat, index) => {
    //   seat.x = xStart;
    //   seat.y = yStart;
    //   // Calculate the next x and y positions based on the seat width
    //   xStart += seatWidth + /* spacing between sleeper seats in SVG */;
    //   // After a row is filled, move to the next row
    //   if (index % /* number of sleeper seats per row */ === 0) {
    //     xStart = /* reset x position for a new row */;
    //     yStart += seatHeight + /* vertical spacing between rows in SVG */;
    //   }
    // });
  }

  loadSeatsForBus(busId: string): void {
    this.db
      .object(`/seats/${busId}`)
      .valueChanges()
      .subscribe((busSeats: any) => {
        // Assuming "busSeats" is an array for the specified bus
        this.seats = busSeats;
        // Calculate seat coordinates
        this.calculateSeatCoordinates();
      });
  }

  selectSeat(seat: Seat): void {
    if (!seat.isBooked) {
      seat.isSelected = !seat.isSelected;
    }
  }

  getSeatColor(seat: Seat): string {
    if (seat.isBooked) {
      return seat.gender === 'male' ? 'gray' : 'pink';
    }
    return seat.isSelected ? 'green' : 'white';
  }

  // faf

  calculateSeatCoordinates() {
    let xStart = 75; // Starting x position
    let yStart = 70; // Starting y position
    const seatWidth = 75; // Width of each seat
    const seatHeight = 35; // Height of each seat

    if (Array.isArray(this.seats)) {
      for (const seat of this.seats) {
        seat.x = xStart;
        seat.y = yStart;

        // Calculate the next x and y positions based on the seat width
        xStart += seatWidth + 5; // 25 is the spacing between seats

        // After a row is filled, move to the next row
        if (xStart > 475) {
          xStart = 75; // Reset x position
          yStart += seatHeight + 20; // 20 is the vertical spacing between rows
        }
      }
    }
  }
}
