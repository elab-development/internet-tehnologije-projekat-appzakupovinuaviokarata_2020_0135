import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  searchTerm: string = '';
  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    sessionStorage.setItem('isRefreshed', 'false');
    this.loadBookings();
  }

  filteredBookings() {
    const term = this.searchTerm.toLowerCase();
    return this.bookings.filter(
      (booking) =>
        booking.flight?.origin?.toLowerCase().includes(term) ||
        booking.flight?.destination?.toLowerCase().includes(term) ||
        booking.status.toLowerCase().includes(term) ||
        booking.flight?.airline.toLowerCase().includes(term) ||
        booking.booking_id.toString().includes(term)
    );
  }

  loadBookings() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.user_id;
    this.bookingService.getAllBookingsDataForUser(userId).subscribe((data) => {
      this.bookings = data;
    });
  }
  confirmBooking(bookingId: number) {
    this.bookingService.updateBooking(bookingId).subscribe(() => {
      this.loadBookings();
    });
  }

  deleteBooking(bookingId: number) {
    this.bookingService.checkBooking(bookingId).subscribe((response) => {
      if (response.exists) {
        this.bookingService.deleteBooking(bookingId).subscribe(() => {
          this.loadBookings();
        });
      } else {
        alert('Booking does not exist.');
        this.loadBookings();
      }
    });
  }
}
