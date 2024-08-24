import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Flight } from '../../models/flight';
import { Airport } from '../../models/airport';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  fromAirport: Airport;
  toAirport: Airport;
  travelDate: string = '';

  flights: Flight[] = [];
  airports: Airport[] = [];
  isLoading = false;

  constructor(private searchService: SearchService, private router: Router) {}
  ngOnInit() {
    this.loadAirports();
  }
  loadAirports() {
    this.searchService.getAllAirport().subscribe((res: Airport[]) => {
      this.airports = res;
      //console.log(this.airports); // radi
    });
  }

  searchFlights() {
    this.isLoading = true;

    this.searchService
      .searchFlights(this.fromAirport, this.toAirport, this.travelDate)
      .subscribe({
        next: (res: Flight[]) => {
          this.flights = res;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.flights = []; // osigurava da se prikaže poruka ako dođe do greške
        },
      });
  }

  bookFlight(flightId: number) {
    this.router.navigate(['/book-flight', flightId]);
  }
}
