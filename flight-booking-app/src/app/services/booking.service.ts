import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = 'http://127.0.0.1:8000/api/bookings';
  private baseUrlData = 'http://127.0.0.1:8000/api/bookingsall';
  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getAllBookingsData(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlData);
  }

  getBookingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createBooking(booking: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, booking);
  }

  updateBooking(id: number, booking: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  confirmBooking(userId: number, flightId: number): Observable<any> {
    const bookingData = {
      flight_id: flightId,
      status: 'confirmed',
    };
    return this.http.post(`${this.baseUrl}`, bookingData);
  }
}
