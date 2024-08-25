import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { SearchService } from '../../services/search.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BookingConfirmationComponent } from '../../booking-confirmation/booking-confirmation.component';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss'],
})
export class BookFlightComponent implements OnInit {
  flightId: number;
  flight: any;
  originAirportName: string = '';
  destinationAirportName: string = '';
  flightDuration: string = ''; // Dodaj ovu promenljivu
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private flightService: FlightService,
    private searchService: SearchService,
    private bookingService: BookingService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const flightId = this.route.snapshot.params['id'];
    this.flightService.getFlightById(flightId).subscribe((flight) => {
      this.flight = flight;
      this.flightId = flight.flight_id;
      this.originAirportName = flight.origin.split(',')[2];
      this.destinationAirportName = flight.destination.split(',')[2];

      // Izračunavanje vremena leta
      const departureDate = new Date(flight.departure_date);
      const arrivalDate = new Date(flight.arrival_date);
      const durationInMilliseconds =
        arrivalDate.getTime() - departureDate.getTime();

      const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor(
        (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );

      this.flightDuration = `${hours}h ${minutes}m`;

      this.isLoading = false;
    });
  }

  confirmBooking() {
    const userId = this.authService.getUserId();
    if (userId === null) {
      console.error('User ID is missing.');
      return;
    }

    if (!this.flightId) {
      console.error('Flight ID is missing.');
      return;
    }

    this.bookingService
      .confirmBooking(userId, this.flightId)
      .subscribe((response) => {
        console.log('Booking confirmed:', response);
        // Prikazivanje obaveštenja
        this.dialog.open(BookingConfirmationComponent);
        // Preusmeravanje na my-bookings stranicu
        this.router.navigate(['/my-bookings']);
      });
  }
}
