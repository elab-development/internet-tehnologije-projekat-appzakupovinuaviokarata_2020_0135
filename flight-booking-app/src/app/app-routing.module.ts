import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

import { SearchComponent } from './pages/search/search.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { BookFlightComponent } from './pages/book-flight/book-flight.component';
import { WebsiteLandingComponent } from './pages/website-landing/website-landing.component';
import { FlightsComponent } from './pages/admin/flights/flights.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { UsersComponent } from './pages/admin/users/users.component';
import { BookingsComponent } from './pages/admin/bookings/bookings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //Admin
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'flights', component: FlightsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },

  //User
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'search', component: SearchComponent, canActivate: [UserGuard] },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'book-flight',
    component: BookFlightComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'book-flight/:id',
    component: BookFlightComponent,
    canActivate: [UserGuard],
  },
  { path: '', redirectTo: 'book-flight', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }, // ukoliko ne postoji trazena ruta, vrati na login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
