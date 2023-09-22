import { Component } from '@angular/core';
import { Seat } from '../shared/seat.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent {
  seat: any;
  seatData: any[] = [];
  passengerGender: string = '';

  selectedSeats: Seat[] = [];

  seats: Seat[] = [
    { id: '1', deck: 'lower', type: 'seater', isBooked: false },
    { id: '2', deck: 'lower', type: 'seater', isBooked: true },
    { id: '3', deck: 'lower', type: 'seater', isBooked: false },
    { id: '4', deck: 'lower', type: 'seater', isBooked: true },
    { id: '5', deck: 'lower', type: 'seater', isBooked: false },
    { id: '6', deck: 'lower', type: 'seater', isBooked: true },
    { id: '7', deck: 'lower', type: 'seater', isBooked: false },
    { id: '8', deck: 'lower', type: 'seater', isBooked: true },
    { id: '9', deck: 'lower', type: 'seater', isBooked: false },
    { id: '10', deck: 'lower', type: 'seater', isBooked: true },
    { id: '11', deck: 'lower', type: 'seater', isBooked: false },
    { id: '12', deck: 'lower', type: 'seater', isBooked: true },
    { id: '13', deck: 'lower', type: 'seater', isBooked: false },
    { id: '14', deck: 'lower', type: 'seater', isBooked: true },
    { id: '15', deck: 'lower', type: 'seater', isBooked: false },
    { id: '16', deck: 'lower', type: 'seater', isBooked: true },
    { id: '17', deck: 'lower', type: 'seater', isBooked: false },
    { id: '18', deck: 'lower', type: 'seater', isBooked: true },
    { id: '19', deck: 'lower', type: 'sleeper', isBooked: false },
    { id: '20', deck: 'lower', type: 'sleeper', isBooked: true },
    { id: '21', deck: 'lower', type: 'sleeper', isBooked: false },
    { id: '22', deck: 'lower', type: 'sleeper', isBooked: true },
    { id: '23', deck: 'lower', type: 'sleeper', isBooked: false },
    { id: '24', deck: 'upper', type: 'sleeper', isBooked: true },
    { id: '25', deck: 'upper', type: 'sleeper', isBooked: false },
    { id: '26', deck: 'upper', type: 'sleeper', isBooked: true },
    { id: '27', deck: 'upper', type: 'sleeper', isBooked: false },
    { id: '28', deck: 'upper', type: 'sleeper', isBooked: true },
    { id: '29', deck: 'upper', type: 'sleeper', isBooked: false },
    { id: '30', deck: 'upper', type: 'sleeper', isBooked: true },
    { id: '31', deck: 'upper', type: 'sleeper', isBooked: false },
    { id: '32', deck: 'upper', type: 'sleeper', isBooked: true },
    { id: '33', deck: 'upper', type: 'sleeper', isBooked: false },
    { id: '34', deck: 'upper', type: 'sleeper', isBooked: true },
    { id: '35', deck: 'upper', type: 'sleeper', isBooked: false },
    { id: '36', deck: 'upper', type: 'sleeper', isBooked: true },
    { id: '37', deck: 'upper', type: 'sleeper', isBooked: false },
    { id: '38', deck: 'upper', type: 'sleeper', isBooked: true },
    
  ];

  lowerDeckSeaterSeats: Seat[] = this.seats.filter(
    (seat) => seat.deck === 'lower' && seat.type === 'seater'
  );

  // Define lower deck sleeper seats
  lowerDeckSleeperSeats: Seat[] = this.seats.filter(
    (seat) => seat.deck === 'lower' && seat.type === 'sleeper'
  );

  // Define upper deck sleeper seats
  upperDeckSleeperSeats: Seat[] = this.seats.filter(
    (seat) => seat.deck === 'upper' && seat.type === 'sleeper'
  );

  selectSeat(seat: Seat): void {
    if (!seat.isBooked) {
      seat.isSelected = !seat.isSelected;
      if (seat.isSelected) {
        this.selectedSeats.push(seat);
      } else {
        this.selectedSeats = this.selectedSeats.filter(selectedSeat => selectedSeat.id !== seat.id);
      }
    }
  }

  // Filter lower deck seater seats
  getLowerDeckSeaterSeats(): Seat[] {
    return this.seats.filter(
      (seat) => seat.deck === 'lower' && seat.type === 'seater'
    );
  }

  // Filter lower deck sleeper seats
  getLowerDeckSleeperSeats(): Seat[] {
    return this.seats.filter(
      (seat) => seat.deck === 'lower' && seat.type === 'sleeper'
    );
  }

  // Filter upper deck sleeper seats
  getUpperDeckSleeperSeats(): Seat[] {
    return this.seats.filter(
      (seat) => seat.deck === 'upper' && seat.type === 'sleeper'
    );
  }

  isAdjacentSeatAvailable(seat: Seat, passengerGender: string): boolean {
    const seatId = parseInt(seat.id, 10); // Convert seat ID to a number
    if (isNaN(seatId)) {
      // Handle the case where seat.id is not a valid number
      return false;
    }

    const adjacentSeat = this.seats.find((s) => {
      const adjacentSeatId = parseInt(s.id, 10); // Convert adjacent seat ID to a number
      if (isNaN(adjacentSeatId)) {
        // Handle the case where s.id is not a valid number
        return false;
      }
      return adjacentSeatId === seatId + 1 || adjacentSeatId === seatId - 1;
    });

    if (
      adjacentSeat &&
      adjacentSeat.gender === 'female' &&
      passengerGender === 'male'
    ) {
      return false; // Prevent male passenger from booking next to a female passenger
    }

    return true; // Allow booking if no adjacent female passenger or if genders are compatible
  }

  // isSeatBooked(seatId: string): boolean {
  //   // Check seat availability based on your seat data
  //   // Return true if the seat is booked, false otherwise
  //   const seat = this.seatData.find((seat) => seat.id === seatId);
  //   return !!seat && seat.isBooked;
  // }

  calculateSeatPrice(seat: Seat): number {
    if (seat.type === 'seater') {
      if (seat.deck === 'lower') {
        return 700;
      } else {
        return 1100; // Upper deck seater
      }
    } else if (seat.type === 'sleeper') {
      if (seat.deck === 'lower') {
        return 1200;
      } else {
        return 1100; // Upper deck sleeper
      }
    }
    return 0; // Default case
  }

  constructor() {
    // Initialize seatData here or fetch data from a service
  }

  proceedToPassengerInfo(): void {
    // Navigate to PassengerInfoComponent with this.selectedSeats
    // You can use Angular's router to navigate and pass data to the next component
  }
}
