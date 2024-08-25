import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent {
  showConfirmation = true;

  constructor(private router: Router) {}

  goToSearch() {
    this.showConfirmation = false; // Sakrij komponentu
    this.router.navigate(['/search']); // Preusmeri na Search stranicu
  }

  goToMyBookings() {
    this.showConfirmation = false; // Sakrij komponentu
    this.router.navigate(['/my-bookings']); // Preusmeri na My Bookings stranicu
  }
}
