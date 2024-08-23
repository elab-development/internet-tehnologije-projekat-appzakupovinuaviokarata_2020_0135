import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-website-landing',
  templateUrl: './website-landing.component.html',
  styleUrl: './website-landing.component.scss',
})
export class WebsiteLandingComponent {
  showNavbar: boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.updateNavbarVisibility();
    });
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
}
