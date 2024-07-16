// flights.component.ts

import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  flights: any[] = [];
  displayedColumns: string[] = [
    'flight_id',
    'airline',
    'origin',
    'destination',
    'departure_date',
    'arrival_date',
    'capacity',
    'price',
  ];

  constructor(private flightsService: FlightsService) {}

  ngOnInit(): void {
    this.fetchFlights();
  }

  fetchFlights() {
    this.flightsService.getAllFlights().subscribe((data) => {
      this.flights = data;
    });
  }
}
