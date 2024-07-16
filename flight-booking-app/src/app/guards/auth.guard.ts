import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    const userString = localStorage.getItem('user');
    let role = '';
    if (userString) {
      const user = JSON.parse(userString);
      role = user.role;
    }
    if (token && role === 'admin') {
      return true;
    } else {
      this.logout();
      return false;
    }
  }
  logout(): void {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
