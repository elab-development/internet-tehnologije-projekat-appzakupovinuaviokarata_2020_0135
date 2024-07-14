import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.registerForm.valid) {
      this.apiService.register(this.registerForm.value).subscribe(response => {
        // Obradite odgovor, npr. preusmeravanje ili prikaz poruke
        console.log(response);
      }, error => {
        // Obrada grešaka
        console.error(error);
      });
    }
  }
}
