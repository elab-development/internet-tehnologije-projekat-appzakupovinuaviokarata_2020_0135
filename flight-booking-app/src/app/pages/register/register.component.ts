import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get usernameFormControl() {
    return this.registerForm.get('username') as FormControl;
  }
  get emailFormControl() {
    return this.registerForm.get('email') as FormControl;
  }
  get passwordFormControl() {
    return this.registerForm.get('password') as FormControl;
  }
  get passwordConfirmationFormControl() {
    return this.registerForm.get('password_confirmation') as FormControl;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const userData = {
        ...this.registerForm.value,
        role: 'user',
      };
      this.authService.register(userData).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/login']);
      });
    }
  }
}
