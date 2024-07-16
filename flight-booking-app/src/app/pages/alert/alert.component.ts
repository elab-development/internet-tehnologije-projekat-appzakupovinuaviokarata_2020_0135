import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  template: `
    <h1 mat-dialog-title>Obaveštenje</h1>
    <div mat-dialog-content>
      <p>Morate prvo da se ulogujete.</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="close()">OK</button>
    </div>
  `,
  styles: [
    `
      h1 {
        color: #d32f2f;
      }
      div {
        text-align: center;
      }
    `,
  ],
})
export class AlertDialogComponent {
  constructor(private dialogRef: MatDialogRef<AlertDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
