import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss'],
})
export class BookingConfirmationComponent {
  showConfirmation = true;

  constructor(private router: Router) {}

  goToSearch() {
    this.showConfirmation = false;
    this.router.navigate(['/search']);
  }

  goToMyBookings() {
    this.showConfirmation = false;
    this.router.navigate(['/my-bookings']);
  }
}
