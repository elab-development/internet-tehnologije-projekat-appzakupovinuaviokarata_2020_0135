import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup;
  constructor(private fb:FormBuilder, private authService:AuthService){
    
  }
  get emailFormControl(){
    return this.loginForm.get('email') as FormControl;
  }
  get passwordFormControl(){
    return this.loginForm.get('password') as FormControl;
  } 

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email:['',[Validators.email, Validators.required]],
        password: ['',Validators.required]
      });
  }
  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe((res)=>console.log(res));
      //this.authService.login(this.loginForm.value).subscribe(res=>localStorage.setItem('token',res.access_token));
    }
    
  }
}
