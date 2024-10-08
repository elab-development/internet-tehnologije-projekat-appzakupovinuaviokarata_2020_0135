import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private apiUrl = 'http://127.0.0.1:8000/api/airports';

  constructor(private http: HttpClient) {}

  getAllAirports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAirport(airport: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, airport);
  }

  updateAirport(id: number, airport: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, airport);
  }

  deleteAirport(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  checkAirportName(name: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(
      `${this.apiUrl}/check-name/${name}`
    );
  }
}
