import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AirportService } from '../../services/airport.service';

@Component({
  selector: 'app-update-airport-dialog',
  templateUrl: './update-airport-dialog.component.html',
  styleUrls: ['./update-airport-dialog.component.scss'],
})
export class UpdateAirportDialogComponent {
  airportForm: FormGroup;
  existingAirportNames: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateAirportDialogComponent>,
    private airportService: AirportService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.airportForm = new FormGroup({
      name: new FormControl(data.name, Validators.required),
      city: new FormControl(data.city, Validators.required),
      country: new FormControl(data.country, Validators.required),
    });

    this.airportService.getAllAirports().subscribe((airports) => {
      this.existingAirportNames = airports.map((airport) => airport.name);
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    if (this.airportForm.valid) {
      const formValues = this.airportForm.value;

      if (
        this.existingAirportNames.includes(formValues.name) &&
        formValues.name !== this.data.name
      ) {
        this.airportForm.get('name')?.setErrors({ nameExists: true });
        this.airportForm.get('name')?.markAsTouched();
        return;
      }

      this.dialogRef.close(this.airportForm.value);
    }
  }
}
