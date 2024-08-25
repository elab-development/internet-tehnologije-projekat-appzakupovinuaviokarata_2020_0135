import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Airport } from '../models/airport';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  url: string = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllAirport(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.url}/airports`);
  }

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.url}/flights`);
  }

  searchFlights(
    departureAirport: Airport,
    arrivalAirport: Airport,
    travelDate: string
  ): Observable<Flight[]> {
    return this.http
      .get<Flight[]>(`${this.url}/flights`)
      .pipe(
        map((flights: Flight[]) =>
          flights.filter(
            (flight) =>
              flight.origin === this.formatAirport(departureAirport) &&
              flight.destination === this.formatAirport(arrivalAirport) &&
              flight.departure_date.split(' ')[0] === travelDate
          )
        )
      );
  }

  private formatAirport(airport: Airport): string {
    return `${airport.city}, ${airport.country}, ${airport.name}`;
  }

  getAirportName(id: number): Observable<string> {
    return this.getAllAirport().pipe(
      map((airports) => {
        const airport = airports.find((a) => a.airport_id === id);
        return airport ? airport.name : 'Unknown Airport';
      })
    );
  }
}
