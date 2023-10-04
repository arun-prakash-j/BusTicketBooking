import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-manage-buses',
  templateUrl: './manage-buses.component.html',
  styleUrls: ['./manage-buses.component.css'],
})
export class ManageBusesComponent {
  buses: any[] = [];
  showEditForm = false;
  busToDelete: any;
  showAddForm = false;
  showDeletePopUp = false;
  newBus: any = {};

  formData: any = {};

  constructor(private router: Router, private database: AngularFireDatabase) {}

  ngOnInit(): void {
    this.database
      .object('/Bus Details')
      .valueChanges()
      .subscribe((buses: any) => {
        console.log('Fetched buses:', buses);

        if (buses) {
          this.buses = Object.keys(buses).map((key) => {
            const bus = buses[key];
            return {
              busId: key,
              busNo: bus['BusNo'],
              arriveTime: bus['ArriveTime'],
              departTime: bus['DepartTime'],
              from: bus['From'],
              to: bus['To'],
              minPrice: bus['MinPrice'],
              seatsLeft: bus['SeatsLeft'],
              type: bus['Type'],
            };
          });
        } else {
          console.error('No data found in "Bus Details"');
        }
      });
  }

  isValidBus(bus: any): boolean {
    return (
      bus &&
      typeof bus['BusNo'] === 'string' &&
      typeof bus['ArriveTime'] === 'string' &&
      typeof bus['DepartTime'] === 'string' &&
      typeof bus['From'] === 'string' &&
      typeof bus['To'] === 'string' &&
      typeof bus['MinPrice'] === 'number' &&
      typeof bus['SeatsLeft'] === 'number' &&
      typeof bus['Type'] === 'string'
    );
  }

  showEdit(bus: any) {
    this.showEditForm = true;

    this.formData = { ...bus };
  }

  cancelEdit() {
    this.showEditForm = false;
  }

  saveChanges() {
    if (this.formData && this.formData.busId) {
      const busId = this.formData.busId;

      const updatedBusData = {
        ArriveTime: this.formData.arriveTime,
        DepartTime: this.formData.departTime,
      };

      this.database
        .object(`/Bus Details/${busId}`)
        .update(updatedBusData)
        .then(() => {
          console.log('Bus details updated successfully');
          this.cancelEdit();
        })
        .catch((error) => {
          console.error('Error updating bus details:', error);
        });
    } else {
      console.error('Invalid bus data or busId');
    }
  }

  addBus() {
    // Validate that all required fields are filled
    if (
      !this.newBus.busNo ||
      !this.newBus.arriveTime ||
      !this.newBus.departTime ||
      !this.newBus.from ||
      !this.newBus.to ||
      !this.newBus.minPrice ||
      !this.newBus.seatsLeft ||
      !this.newBus.type
    ) {
      console.error('Please fill in all required fields.');
      return;
    }

    // Calculate the next available key for the new bus
    const nextKey = this.calculateNextKey();

    // Create an object with the new bus details
    const newBusData = {
      BusNo: this.newBus.busNo,
      ArriveTime: this.newBus.arriveTime,
      DepartTime: this.newBus.departTime,
      From: this.newBus.from,
      To: this.newBus.to,
      MinPrice: this.newBus.minPrice,
      SeatsLeft: this.newBus.seatsLeft,
      Type: this.newBus.type,
    };

    // Update the specific bus entry in the Firebase Realtime Database with the calculated key
    this.database
      .object(`/Bus Details/${nextKey}`)
      .update(newBusData)
      .then(() => {
        // Data updated successfully
        console.log('Bus details added successfully');

        // Call the createSeatLayout function with the new busNo
        this.createSeatLayout(this.newBus.busNo); // Pass the new busNo here

        this.showAddForm = false; // Hide the add bus form
        this.newBus = {}; // Reset the newBus object to clear the form fields
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error adding bus details:', error);
      });
  }

  showDelete(bus: any) {
    this.busToDelete = bus;
    this.showDeletePopUp = true;
  }

  cancelDelete() {
    this.showDeletePopUp = false;
  }

  deleteBus(bus: any) {
    // Check if there's a bus to delete
    if (!bus || !bus.busId) {
      console.error('Invalid bus data or busId');
      this.cancelDelete(); // Close the modal
      return;
    }

    // Get the busId to be deleted
    const busId = bus.busId;

    // Delete the specific bus entry from the Firebase Realtime Database
    this.database
      .object(`/Bus Details/${busId}`)
      .remove()
      .then(() => {
        // Data removed successfully
        console.log('Bus deleted successfully');
        this.cancelDelete(); // Close the modal

        // Remove the deleted bus from the local list to reflect the change
        this.buses = this.buses.filter((b) => b.busId !== busId);

        // Delete the corresponding seat layout data from the "Seats" node
        this.database
          .object(`/Seats/${bus.busNo}`)
          .remove()
          .then(() => {
            console.log('Seat layout deleted successfully for bus:', bus.busNo);
          })
          .catch((error) => {
            console.error('Error deleting seat layout:', error);
          });
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error deleting bus:', error);
        this.cancelDelete(); // Close the modal
      });
  }

  calculateNextKey(): number {
    // Extract the keys of existing buses
    const existingKeys: number[] = this.buses
      .filter((bus) => bus['busId']) // Filter out buses without a 'busId' property
      .map((bus) => {
        const numericPart = bus['busId'];
        return numericPart ? Number(numericPart) : 0; // Handle cases where 'busId' doesn't contain a numeric part
      });

    // Find the maximum key value
    const maxKey = existingKeys.length > 0 ? Math.max(...existingKeys) : 0;
    // Calculate the next key by adding 1 to the maximum key
    return maxKey + 1;
  }

  cancelAdd() {
    this.showAddForm = false;
    // Reset the newBus object to clear the form fields
    this.newBus = {};
  }

  backToAdminInterface() {
    this.router.navigate(['/admin-interface']);
  }

  // Function to create seat layout for a bus
  createSeatLayout(busNo: string) {
    if (!busNo) {
      console.error('Invalid busNo for seat layout creation');
      return;
    }

    const lowerDeckSeats = [];
    const upperDeckSeats = [];

    // Create 10 seater seats for the 1st column lower deck
    for (let i = 0; i <= 9; i++) {
      lowerDeckSeats.push({
        busNo: busNo,
        deck: 'lower',
        gender: '',
        height: 30,
        id: i + 1 * (i + 1),
        isBooked: false,
        passengerAge: '',
        passengerName: '',
        price: 700,
        type: 'seater',
        width: 30,
        x: 75 + 50 * i,
        y: 70,
      });
    }

    // Create 10 seater seats for the 2nd column lower deck
    for (let i = 0; i <= 9; i++) {
      lowerDeckSeats.push({
        busNo: busNo,
        deck: 'lower',
        gender: '',
        height: 30,
        id: i + 1 * (i + 2),
        isBooked: false,
        passengerAge: '',
        passengerName: '',
        price: 700,
        type: 'seater',
        width: 30,
        x: 75 + 50 * i,
        y: 110,
      });
    }

    // Create 5 sleeper seats for the 3rd column lower deck
    for (let i = 0; i <= 4; i++) {
      lowerDeckSeats.push({
        busNo: busNo,
        deck: 'lower',
        gender: '',
        height: 35,
        id: 21 + i,
        isBooked: false,
        passengerAge: '',
        passengerName: '',
        price: 1200,
        type: 'sleeper',
        width: 75,
        x: 75 + 100 * i,
        y: 220,
      });
    }

    // Create 5 sleeper seats for the 1st column upper deck
    for (let i = 0; i <= 4; i++) {
      upperDeckSeats.push({
        busNo: busNo,
        deck: 'upper',
        gender: '',
        height: 35,
        id: i * 2 + 26,
        isBooked: false,
        passengerAge: '',
        passengerName: '',
        price: 1100,
        type: 'sleeper',
        width: 75,
        x: 75 + 100 * i,
        y: 70,
      });
    }

    // Create 5 sleeper seats for the 2nd column upper deck
    for (let i = 0; i <= 4; i++) {
      upperDeckSeats.push({
        busNo: busNo,
        deck: 'upper',
        gender: '',
        height: 35,
        id: i * 2 + 27,
        isBooked: false,
        passengerAge: '',
        passengerName: '',
        price: 1100,
        type: 'sleeper',
        width: 75,
        x: 75 + 100 * i,
        y: 110,
      });
    }

    // Create 5 sleeper seats for the 3rd column upper deck
    for (let i = 0; i <= 4; i++) {
      upperDeckSeats.push({
        busNo: busNo,
        deck: 'upper',
        gender: '',
        height: 35,
        id: i + 36,
        isBooked: false,
        passengerAge: '',
        passengerName: '',
        price: 1100,
        type: 'sleeper',
        width: 75,
        x: 75 + 100 * i,
        y: 220,
      });
    }

    const seatLayout = {
      lowerDeck: lowerDeckSeats,
      upperDeck: upperDeckSeats,
    };

    // Update the seat layout in the Firebase Realtime Database
    this.database
      .object(`/Seats/${busNo}`)
      .set(seatLayout)
      .then(() => {
        console.log('Seat layout created successfully for bus:', busNo);
      })
      .catch((error) => {
        console.error('Error creating seat layout:', error);
      });
  }
}
