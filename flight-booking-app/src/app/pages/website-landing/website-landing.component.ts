import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-website-landing',
  templateUrl: './website-landing.component.html',
  styleUrl: './website-landing.component.scss',
})
export class WebsiteLandingComponent {
  showNavbar: boolean = true;
  disableButtons: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(() => {
      this.updateNavbarVisibility();
    });
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateButtonState(event.url);
      }
    });
  }

  updateButtonState(url: string): void {
    this.disableButtons = url.includes('book-flight');
  }
  updateNavbarVisibility() {
    const currentUrl = this.router.url;
    const hiddenNavbarUrls = [
      '/users',
      '/flights',
      '/dashboard',
      '/bookings',
      '/register',
      '/login',
      '/airports',
    ];

    this.showNavbar = !hiddenNavbarUrls.includes(currentUrl);
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }
}
