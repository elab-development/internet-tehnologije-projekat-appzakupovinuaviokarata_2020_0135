import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss'],
})
export class UpdateUserDialogComponent {
  userForm: FormGroup;
  existingUsernames: string[] = [];
  existingEmails: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = new FormGroup({
      username: new FormControl(data.username, Validators.required),
      email: new FormControl(data.email, [
        Validators.required,
        Validators.email,
      ]),
      role: new FormControl(data.role, Validators.required),
    });

    this.userService.getAllUsers().subscribe((users) => {
      this.existingUsernames = users.map((user) => user.username);
    });
    this.userService.getAllUsers().subscribe((users) => {
      this.existingEmails = users.map((user) => user.email);
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValues = this.userForm.value;

      if (
        this.existingUsernames.includes(formValues.username) &&
        formValues.username !== this.data.username
      ) {
        this.userForm.get('username')?.setErrors({ usernameExists: true });
        this.userForm.get('username')?.markAsTouched();
        return;
      }
      if (
        this.existingEmails.includes(formValues.email) &&
        formValues.email !== this.data.email
      ) {
        this.userForm.get('email')?.setErrors({ email: true });
        this.userForm.get('email')?.markAsTouched();
        return;
      }
      this.dialogRef.close(this.userForm.value);
    }
  }
}
