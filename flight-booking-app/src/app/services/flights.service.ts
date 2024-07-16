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

  // Metoda za dohvatanje svih letova
  getAllFlights(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Metoda za dohvatanje jednog leta po ID-u
  getFlightById(flightId: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${flightId}`;
    return this.http.get<any>(url, { headers });
  }

  // Metoda za kreiranje novog leta
  createFlight(flightData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl, flightData, { headers });
  }

  // Metoda za ažuriranje leta
  updateFlight(flightId: number, flightData: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${flightId}`;
    return this.http.put(url, flightData, { headers });
  }

  // Metoda za brisanje leta
  deleteFlight(flightId: number): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${flightId}`;
    return this.http.delete(url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
