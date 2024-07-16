import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Airport } from '../models/airport';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url: string = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.getToken(); // Replace with your session method to get the token
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getAllAirport(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.url}/airports`, { headers: this.getHeaders() });
  }

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.url}/flights`, { headers: this.getHeaders() });
  }

  searchFlights(departureAirportID: number, arrivalAirportID: number, travelDate: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.url}/flights`, { headers: this.getHeaders() }).pipe(
      map((flights: Flight[]) =>
        flights.filter(flight =>
          flight.origin === departureAirportID.toString() &&
          flight.destination === arrivalAirportID.toString() &&
          flight.departure_date === travelDate
        )
      )
    );
  }

  private getToken(): string {
    // Replace this with your session management logic to retrieve the token
    return 'YOUR_TOKEN_HERE'; 
  }
}
