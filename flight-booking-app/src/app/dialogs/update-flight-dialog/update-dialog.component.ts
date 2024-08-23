import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AirportService } from '../../services/airport.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
})
export class UpdateDialogComponent {
  flightForm: FormGroup;
  airports: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private airportService: AirportService
  ) {
    this.flightForm = new FormGroup({
      flight_id: new FormControl({ value: data.flight_id, disabled: true }),
      airline: new FormControl(data.airline, Validators.required),
      origin: new FormControl(data.origin, Validators.required),
      destination: new FormControl(data.destination, Validators.required),
      departure_date: new FormControl(
        this.datePipe.transform(data.departure_date, 'yyyy-MM-dd'),
        Validators.required
      ),
      departure_time: new FormControl(
        this.formatTime(data.departure_date),
        Validators.required
      ),
      arrival_date: new FormControl(
        this.datePipe.transform(data.arrival_date, 'yyyy-MM-dd'),
        Validators.required
      ),
      arrival_time: new FormControl(
        this.formatTime(data.arrival_date),
        Validators.required
      ),
      capacity: new FormControl(data.capacity, [
        Validators.required,
        Validators.min(1),
      ]),
      price: new FormControl(data.price, [
        Validators.required,
        Validators.min(0),
      ]),
    });

    this.onDepartureDateChange();
    this.loadAirports();
  }

  loadAirports(): void {
    this.airportService.getAllAirports().subscribe((airports) => {
      this.airports = airports;
    });
  }

  onDepartureDateChange(): void {
    this.flightForm
      .get('departure_date')
      ?.valueChanges.subscribe((departureDate) => {
        const arrivalDateControl = this.flightForm.get('arrival_date');
        const arrivalTimeControl = this.flightForm.get('arrival_time');

        if (departureDate) {
          arrivalDateControl?.setValue(departureDate);
          arrivalDateControl?.enable();
          arrivalTimeControl?.enable();
        }

        arrivalDateControl?.setValidators([
          Validators.required,
          Validators.min(new Date(departureDate).getTime()),
        ]);
      });
  }

  formatTime(date: string | Date): string {
    const dateObj = new Date(date);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  onCancel(): void {
    this.dialogRef.close(null);
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

      if (departureDate >= arrivalDate) {
        this.flightForm.get('arrival_time')?.setErrors({ invalidTime: true });
        return;
      }

      const updatedFlight = {
        ...formValues,
        departure_date: departureDateTimeString,
        arrival_date: arrivalDateTimeString,
      };

      this.dialogRef.close(updatedFlight);
    }
  }
}
