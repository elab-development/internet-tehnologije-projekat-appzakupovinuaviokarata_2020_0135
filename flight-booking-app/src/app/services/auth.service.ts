
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  login(user: User):Observable<any>{
   return this.http.post(`${this.url}/login`,user);
  }
  register(credentials: { username: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.url}/register`, credentials);
  }
}
