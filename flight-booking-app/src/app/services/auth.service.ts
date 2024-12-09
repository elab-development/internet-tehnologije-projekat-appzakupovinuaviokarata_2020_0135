import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(`${this.url}/login`, user);
  }

  register(credentials: {
    username: string;
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${this.url}/register`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.url}/logout`, {});
  }

  getUserId(): number | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user ? user.id : null;
    }
    return null;
  }
  
}
