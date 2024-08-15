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
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { SearchComponent } from './pages/search/search.component';
import { BookFlightComponent } from './pages/book-flight/book-flight.component';
import { WebsiteLandingComponent } from './pages/website-landing/website-landing.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { AlertDialogComponent } from './pages/alert/alert.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from './dialogs/update-dialog/update-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
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
    AlertDialogComponent,
    UpdateDialogComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatNativeDateModule,
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
