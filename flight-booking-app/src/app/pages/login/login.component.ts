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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get emailFormControl() {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordFormControl() {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('auth_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.redirectUser(res.user.role);
      });
    }
  }
  redirectUser(role: string) {
    if (role === 'admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/search']);
    }
  }
}
