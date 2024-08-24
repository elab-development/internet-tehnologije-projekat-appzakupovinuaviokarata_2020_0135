import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AirportService } from '../../services/airport.service';
@Component({
  selector: 'app-add-flight-dialog',
  templateUrl: './add-flight-dialog.component.html',
  styleUrls: ['./add-flight-dialog.component.scss'],
})
export class AddFlightDialogComponent {
  flightForm: FormGroup;
  airports: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddFlightDialogComponent>,
    private datePipe: DatePipe,
    private airportService: AirportService
  ) {
    this.flightForm = new FormGroup({
      airline: new FormControl('', Validators.required),
      origin: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      departure_date: new FormControl('', Validators.required),
      departure_time: new FormControl('', Validators.required),
      arrival_date: new FormControl('', Validators.required),
      arrival_time: new FormControl('', Validators.required),
      capacity: new FormControl('', [Validators.required, Validators.min(1)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
    });
    this.loadAirports();
  }

  loadAirports(): void {
    this.airportService.getAllAirports().subscribe((airports) => {
      this.airports = airports;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  formatDateTime(date: string | Date, time: string): string {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return `${formattedDate} ${time}`;
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      const formValues = this.flightForm.getRawValue();

      const departureDateTimeString = this.formatDateTime(
        formValues.departure_date,
        formValues.departure_time
      );
      const arrivalDateTimeString = this.formatDateTime(
        formValues.arrival_date,
        formValues.arrival_time
      );

      const departureDate = new Date(departureDateTimeString);
      const arrivalDate = new Date(arrivalDateTimeString);
      const originF =
        formValues.origin.city +
        ', ' +
        formValues.origin.country +
        ', ' +
        formValues.origin.name;
      const destinationF =
        formValues.destination.city +
        ', ' +
        formValues.destination.country +
        ', ' +
        formValues.destination.name;
      console.log(originF);
      console.log(destinationF);

      if (departureDate >= arrivalDate) {
        this.flightForm.get('arrival_time')?.setErrors({ invalidTime: true });
        return;
      }

      const newFlight = {
        ...formValues,
        departure_date: departureDateTimeString,
        arrival_date: arrivalDateTimeString,
        origin: originF,
        destination: destinationF,
      };

      this.dialogRef.close(newFlight);
    }
  }
}
