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
  ) { }

  ngOnInit(): void {

    this.isLoading=true;
    const flightId = this.route.snapshot.params['id'];
    this.flightService.getFlightById(flightId).subscribe(flight => {
      this.flight = flight;
      this.flightId = flight.flight_id;

      // Get airport names
      this.searchService.getAirportName(+flight.origin).subscribe(name => {
        this.originAirportName = name;
      });
      this.searchService.getAirportName(+flight.destination).subscribe(name => {
        this.destinationAirportName = name;
        this.isLoading=false;

      });
    });
  }

  // getFlightDetails(flightId: number) {
  //   this.flightService.getFlightById(flightId).subscribe((data) => {
  //     this.flight = data;
  //   });
  // }
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

    this.bookingService.confirmBooking(userId, this.flightId).subscribe(response => {
      console.log('Booking confirmed:', response);
      // Prikazivanje obaveštenja
      this.dialog.open(BookingConfirmationComponent);
      // Preusmeravanje na my-bookings stranicu
      this.router.navigate(['/my-bookings']);
  }, error => {
      console.error('Error confirming booking:', error);
  });
  }



}
