import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { SearchService } from '../../services/search.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BookingConfirmationComponent } from '../../booking-confirmation/booking-confirmation.component';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss'],
})
export class BookFlightComponent implements OnInit {
  flightId: number;
  bookingId: number;
  flight: any;
  originAirportName: string = '';
  destinationAirportName: string = '';
  flightDuration: string = '';
  isLoading = false;
  reserved: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private flightService: FlightService,
    private searchService: SearchService,
    private bookingService: BookingService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.isPageRefreshed()) {
      this.cancelReservation();
    }
    //else {
    //  console.log('Stranica je učitana po prvi put');
    //}
    this.isLoading = true;
    this.reserved = false;
    const flightId = this.route.snapshot.params['id'];
    this.flightService.getFlightById(flightId).subscribe((flight) => {
      this.flight = flight;
      this.flightId = flight.flight_id;
      this.originAirportName = flight.origin.split(',')[2];
      this.destinationAirportName = flight.destination.split(',')[2];
      const departureDate = new Date(flight.departure_date);
      const arrivalDate = new Date(flight.arrival_date);
      const durationInMilliseconds =
        arrivalDate.getTime() - departureDate.getTime();
      const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor(
        (durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.flightDuration = `${hours}h ${minutes}m`;

      this.makeReservation();

      this.isLoading = false;
      this.disableNavButtons();
    });
  }

  disableNavButtons(): void {
    const buttons = document.querySelectorAll('mat-toolbar button');
    buttons.forEach((button) => {
      this.renderer.setAttribute(button, 'disabled', 'true');
    });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    const bookingIdStr = localStorage.getItem('currentBookingId');
    const bookingId = bookingIdStr ? Number(bookingIdStr) : null;
    if (bookingId === null) {
      console.error('User ID is missing.');
      return;
    }
    this.bookingService.checkBooking(bookingId).subscribe((response) => {
      if (response.exists) {
        this.bookingService.deleteBooking(bookingId).subscribe(() => {
          this.reserved = false;
        });
      }
    });
  }

  isPageRefreshed(): boolean {
    const refreshed = sessionStorage.getItem('isRefreshed');
    if (refreshed == 'true') {
      return true;
    } else {
      sessionStorage.setItem('isRefreshed', 'true');
      return false;
    }
  }
  makeReservation() {
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
      .makeReservation(userId, this.flightId)
      .subscribe((response) => {
        this.bookingId = response.booking_id;
        this.reserved = true;
        localStorage.setItem('currentBookingId', response.booking_id);
      });
  }

  cancelReservationIfNeeded(): void {
    if (this.reserved) {
      this.cancelReservation();
    }
  }
  cancelReservation(): void {
    const bookingIdStr = localStorage.getItem('currentBookingId');
    const bookingId = bookingIdStr ? Number(bookingIdStr) : null;
    if (bookingId === null) {
      console.error('User ID is missing.');
      return;
    }
    this.bookingService.checkBooking(bookingId).subscribe((response) => {
      if (response.exists) {
        this.bookingService.deleteBooking(bookingId).subscribe(() => {
          this.reserved = false;
        });
      }
    });
  }

  confirmBooking() {
    const bookingIdStr = localStorage.getItem('currentBookingId');
    const bookingId = bookingIdStr ? Number(bookingIdStr) : null;
    if (bookingId === null) {
      console.error('User ID is missing.');
      return;
    }
    this.bookingService.updateBooking(bookingId).subscribe((response) => {
      this.dialog.open(BookingConfirmationComponent);
      this.router.navigate(['/search']);
    });
  }
  cancelReservationButton() {
    this.cancelReservation();
    this.router.navigate(['/search']);
  }
}
