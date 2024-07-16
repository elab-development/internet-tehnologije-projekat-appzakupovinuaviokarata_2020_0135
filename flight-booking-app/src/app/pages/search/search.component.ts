import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Flight } from '../../models/flight';
import { Airport } from '../../models/airport';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  fromAirport: number = 0;
  toAirport: number = 0;
  travelDate: string = '';
  flights: Flight[] = [];
  airports: Airport[] = [];

  constructor(private searchService: SearchService, private router: Router) { }
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
    this.searchService.searchFlights(this.fromAirport, this.toAirport, this.travelDate).subscribe((res: Flight[]) => {
      this.flights = res;
      //this.flights = res.data; mozda treba ovako 

    });
  }

  bookFlight() {
    this.router.navigate(['/book-flight']);
  }
}
