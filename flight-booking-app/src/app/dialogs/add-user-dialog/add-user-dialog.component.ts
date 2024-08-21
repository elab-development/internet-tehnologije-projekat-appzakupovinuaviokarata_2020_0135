import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
})
export class AddUserDialogComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userService: UserService
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.passwordMatchValidator(this.userForm)) {
        this.userForm.get('confirmPassword')?.setErrors({ mismatch: true });
        this.userForm.get('confirmPassword')?.markAsTouched();
        return;
      }
      const formData = {
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        password_confirmation: this.userForm.value.confirmPassword,
        role: this.userForm.value.role,
      };
      this.dialogRef.close(formData);
    }
  }
}
