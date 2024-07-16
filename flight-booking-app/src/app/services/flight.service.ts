import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  url:string = 'http://127.0.0.1:8000/api/flights';
  constructor(private http : HttpClient) { }
  getFlightById(flightId: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.url}/${flightId}`);
  }
  
}
