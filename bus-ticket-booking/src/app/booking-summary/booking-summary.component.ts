// booking-summary.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css'],
})
export class BookingSummaryComponent {
  userData: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe((params) => {
      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state && state['userData']) {
        this.userData = state['userData'];
      }
    });
    console.log('Booking', this.userData);
  }

  ngOnInit(): void {}

  editDetails(): void {
    const busNo = this.route.snapshot.paramMap.get('busNo');

    // Cast userData to the expected type (if you know its type)
    const userDataArray: any[] = this.userData;

    // Extract selected seat IDs from userDataArray
    const selectedSeats = userDataArray.map((user) => user.seatId);

    this.router.navigate([`/buses/${busNo}/seats/passenger-info`], {
      state: {
        selectedSeats,
      },
    });

    // this.router.navigate(['../passenger-info']);
  }

  payAndStoreData(): void {
    // Implement payment processing logic

    // If payment is successful, update Firebase and seat status
    const paymentSuccessful = this.updateFirebaseAndSeatStatus();

    if (paymentSuccessful) {
      console.log('Payment successful. Data stored, and seats booked.');
    } else {
      console.error(
        'Payment successful, but there was an error storing data or booking seats.'
      );
    }
  }

  private updateFirebaseAndSeatStatus(): boolean {
    // Implement Firebase update logic and seat status update
    // Return true if the operation is successful, otherwise return false
    return true; // Placeholder, replace with actual logic
  }
}
