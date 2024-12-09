import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AirportService } from '../../services/airport.service';

@Component({
  selector: 'app-add-airport-dialog',
  templateUrl: './add-airport-dialog.component.html',
  styleUrls: ['./add-airport-dialog.component.scss'],
})
export class AddAirportDialogComponent {
  airportForm: FormGroup;
  existingAirportNames: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddAirportDialogComponent>,
    private airportService: AirportService
  ) {
    this.airportForm = new FormGroup({
      name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
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
      const formData = {
        name: this.airportForm.value.name,
        city: this.airportForm.value.city,
        country: this.airportForm.value.country,
      };
      this.airportService
        .checkAirportName(formData.name)
        .subscribe((response) => {
          if (response.exists) {
            this.airportForm.get('name')?.setErrors({ nameExists: true });
            this.airportForm.get('name')?.markAsTouched();
            return;
          }
          this.dialogRef.close(formData);
        });
    }
  }
}
