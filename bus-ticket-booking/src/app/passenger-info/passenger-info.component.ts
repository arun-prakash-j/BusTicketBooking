// passenger-info.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatService } from '../services/seat.service';
import { Seat } from '../shared/seat.model';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.css'],
})
export class PassengerInfoComponent implements OnInit {
  passengerForms: FormGroup[] = [];
  selectedSeats: Seat[] = [];
  userData: any = {};

  showConfirmationDialog: boolean = false;

  constructor(
    private seatService: SeatService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedSeats = this.seatService.getSelectedSeatNumbers();
    if (this.selectedSeats) {
      console.log('Selected Seats PASSENGER', this.selectedSeats);

      this.passengerForms = this.selectedSeats.map(() =>
        this.fb.group({
          name: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern(/^[A-Za-z\s]+$/),
            ],
          ],
          age: ['', [Validators.required, Validators.min(5)]],
          gender: ['', Validators.required],
        })
      );
    } else {
      console.log('No selected seats data found.');
    }

    this.route.paramMap.subscribe((params) => {
      const busNo = params.get('selectedBusId');
      console.log('busNo:', busNo);
    });
  }

  areAllDetailsFilled(): boolean {
    return this.passengerForms.every((formGroup) => formGroup.valid);
  }

  backToSeatSelectionPage(): void {
    console.log('inside pas info');
    this.seatService.clearSelectedSeatsInLocalStorage();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  proceedToPayout(): void {
    if (this.areAllDetailsFilled()) {
      this.showConfirmationDialog = true;
    }
  }

  confirm(): void {
    // Hide the confirmation dialog
    this.showConfirmationDialog = false;

    // Perform your routing logic here
    const userData = this.selectedSeats.map((seat, i) => {
      return {
        seatId: seat.id,
        name: this.passengerForms[i].get('name')?.value,
        age: this.passengerForms[i].get('age')?.value,
        gender: this.passengerForms[i].get('gender')?.value,
      };
    });

    console.log('Psss', userData);

    this.router.navigate(['/booking-summary'], {
      state: { userData },
    });
  }

  // Add a method to cancel the action
  cancel(): void {
    // Hide the confirmation dialog
    this.showConfirmationDialog = false;
  }
}
