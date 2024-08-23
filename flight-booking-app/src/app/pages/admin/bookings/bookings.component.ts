import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];
  filteredBookings: any[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = [
    'username',
    'flight_id',
    'booking_date',
    'origin',
    'destination',
    'departure_date',
    'arrival_date',
    'actions',
  ];

  constructor(
    private bookingService: BookingService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookingsData().subscribe((data: any[]) => {
      console.log(data);
      this.bookings = data;
      this.filteredBookings = data;
    });
  }

  applyFilter(): void {
    this.filteredBookings = this.bookings.filter(
      (booking) =>
        booking.user.username
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        booking.flight_id == this.searchTerm ||
        booking.flight.origin
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        booking.flight.destination
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        booking.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onDelete(booking: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService
        .deleteBooking(booking)
        .subscribe(() => this.loadBookings());
    }
  }
}
