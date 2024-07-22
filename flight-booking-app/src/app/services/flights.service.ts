// flights.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private baseUrl = 'http://127.0.0.1:8000/api/flights';

  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getFlightById(flightId: number): Observable<any> {
    const url = `${this.baseUrl}/${flightId}`;
    return this.http.get<any>(url);
  }

  createFlight(flightData: any): Observable<any> {
    return this.http.post(this.baseUrl, flightData);
  }

  updateFlight(flightId: number, flightData: any): Observable<any> {
    const url = `${this.baseUrl}/${flightId}`;
    return this.http.put(url, flightData);
  }

  deleteFlight(flightId: number): Observable<any> {
    const url = `${this.baseUrl}/${flightId}`;
    return this.http.delete(url);
  }
}
