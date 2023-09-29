// passenger-info.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SeatService } from '../services/seat.service';
import { Seat } from '../shared/seat.model';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.css'],
})
export class PassengerInfoComponent implements OnInit {
  passengerForms: FormGroup[] = []; // Define the form group
  seatNumbers: number[] = [];
  selectedSeatIds: string[] = [];

  constructor(
    private seatService: SeatService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const seatNumbers = this.seatService.getSelectedSeatNumbers();
    this.seatNumbers = seatNumbers.map(Number);

    this.passengerForms = seatNumbers.map(() =>
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
  }

  ngOnInit(): void {
    const selectedSeatIdsString = localStorage.getItem('selectedSeats');

    if (selectedSeatIdsString) {
      const selectedSeatIds = JSON.parse(selectedSeatIdsString);
      // You may want to perform additional validation or checks here.
      console.log('Selected Seats', selectedSeatIds);
    } else {
      // Handle the case where 'selectedSeats' is not in local storage
      console.log('No selected seats data found.');
    }
  }

  backToSeatSelectionPage(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
