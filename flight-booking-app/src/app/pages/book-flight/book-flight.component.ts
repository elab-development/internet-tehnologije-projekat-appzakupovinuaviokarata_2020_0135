import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { SearchService } from '../../services/search.service';
import { BookingService } from '../../services/booking.service';

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

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private searchService : SearchService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const flightId = this.route.snapshot.params['id'];
    this.flightService.getFlightById(flightId).subscribe(flight => {
      this.flight = flight;

      // Get airport names
      this.searchService.getAirportName(+flight.origin).subscribe(name => {
        this.originAirportName = name;
      });
      this.searchService.getAirportName(+flight.destination).subscribe(name => {
        this.destinationAirportName = name;
      });
    });
  }


  getFlightDetails(flightId: number) {
    this.flightService.getFlightById(flightId).subscribe((data) => {
      this.flight = data;
    });
  }

  confirmBooking(){
    
  }
}
