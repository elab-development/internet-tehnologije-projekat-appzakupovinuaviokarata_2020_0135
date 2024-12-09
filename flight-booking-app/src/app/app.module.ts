import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Token } from '@angular/compiler';
import { TokenInterceptor } from './token.interceptor';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { SearchComponent } from './pages/search/search.component';
import { BookFlightComponent } from './pages/book-flight/book-flight.component';
import { WebsiteLandingComponent } from './pages/website-landing/website-landing.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FlightsComponent } from './pages/admin/flights/flights.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from './dialogs/update-flight-dialog/update-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AddFlightDialogComponent } from './dialogs/add-flight-dialog/add-flight-dialog.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UpdateUserDialogComponent } from './dialogs/update-user-dialog/update-user-dialog.component';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { BookingsComponent } from './pages/admin/bookings/bookings.component';
import { AirportsComponent } from './pages/admin/airports/airports.component';
import { UpdateAirportDialogComponent } from './dialogs/update-airport-dialog/update-airport-dialog.component';
import { AddAirportDialogComponent } from './dialogs/add-airport-dialog/add-airport-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    BookFlightComponent,
    MyBookingsComponent,
    SearchComponent,
    WebsiteLandingComponent,
    SidebarComponent,
    FlightsComponent,
    BookingConfirmationComponent,
    UpdateDialogComponent,
    AddFlightDialogComponent,
    UsersComponent,
    UpdateUserDialogComponent,
    AddUserDialogComponent,
    BookingsComponent,
    AirportsComponent,
    UpdateAirportDialogComponent,
    AddAirportDialogComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatSnackBarModule,
    MatNativeDateModule,
    MatPaginatorModule,
  ],
  providers: [
    AuthGuard,
    UserGuard,
    DatePipe,
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
