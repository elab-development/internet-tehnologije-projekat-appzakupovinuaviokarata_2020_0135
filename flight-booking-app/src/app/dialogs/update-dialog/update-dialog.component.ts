import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
})
export class UpdateDialogComponent {
  flightForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.flightForm = new FormGroup({
      flight_id: new FormControl({ value: data.flight_id, disabled: true }),
      airline: new FormControl(data.airline, Validators.required),
      origin: new FormControl(data.origin, Validators.required),
      destination: new FormControl(data.destination, Validators.required),
      departure_date: new FormControl(data.departure_date, Validators.required),
      arrival_date: new FormControl(data.arrival_date, Validators.required),
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
  }

  onDepartureDateChange(): void {
    this.flightForm
      .get('departure_date')
      ?.valueChanges.subscribe((departureDate) => {
        const arrivalDateControl = this.flightForm.get('arrival_date');
        arrivalDateControl?.setValue(departureDate);
        arrivalDateControl?.enable();
        arrivalDateControl?.setValidators([
          Validators.required,
          Validators.min(departureDate.getTime()),
        ]);
      });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      this.dialogRef.close(this.flightForm.getRawValue());
    }
  }
}
