import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Flight } from '../../models/flight';
import { Airport } from '../../models/airport';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  fromAirport: Airport;
  toAirport: Airport;
  travelDate: string = '';
  capacity: number;
  flights: Flight[] = [];
  airports: Airport[] = [];
  isLoading = false;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private flightsService: FlightsService
  ) {}
  ngOnInit() {
    sessionStorage.setItem('isRefreshed', 'false');
    this.loadAirports();
  }
  loadAirports() {
    this.searchService.getAllAirport().subscribe((res: Airport[]) => {
      this.airports = res;
    });
  }

  searchFlights() {
    this.isLoading = true;

    this.searchService
      .searchFlights(this.fromAirport, this.toAirport, this.travelDate)
      .subscribe({
        next: (res: Flight[]) => {
          this.flights = res.filter((flight) => flight.capacity > 0);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.flights = [];
        },
      });
  }

  bookFlight(flightId: number) {
    this.flightsService.getFlightCapacity(flightId).subscribe((data) => {
      if (data.capacity > 0) {
        this.router.navigate(['/book-flight', flightId]);
      } else {
        alert(
          'oops, looks like the flight is full! Try again later, or check new flight.'
        );
        this.searchFlights();
      }
    });
  }
}
