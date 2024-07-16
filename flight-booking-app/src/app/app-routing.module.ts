import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { SearchComponent } from './pages/search/search.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { BookFlightComponent } from './pages/book-flight/book-flight.component';
import { WebsiteLandingComponent } from './pages/website-landing/website-landing.component';
import { FlightsComponent } from './pages/flights/flights.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //Admin
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'flights', component: FlightsComponent },

  //User
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'book-flight', component: BookFlightComponent },
  { path: '', redirectTo: 'book-flight', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
