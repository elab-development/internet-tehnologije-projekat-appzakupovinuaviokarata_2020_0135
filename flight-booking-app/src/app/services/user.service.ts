import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getUserByID(userId: number): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get<any>(url);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrl, userData);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.put(url, userData);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.delete(url);
  }

  checkUserName(username: string) {
    return this.http.get<{ exists: boolean }>(
      `${this.baseUrl}/check-username/${username}`
    );
  }
  checkEmail(email: string) {
    return this.http.get<{ exists: boolean }>(
      `${this.baseUrl}/check-email/${email}`
    );
  }
}
