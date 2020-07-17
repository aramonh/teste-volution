import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { LOCATION_INITIALIZED } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    name:new FormControl('',Validators.required),
  });
  constructor(private authSvc: AuthService, private router: Router) {}

  async onRegister() {
    const { email, password,name } = this.registerForm.value;

    try {
      const user = await this.authSvc.register(email, password,name).subscribe((response)=>{
        
        localStorage.setItem('email',response.email);
        localStorage.setItem('name',response.name);
        
        localStorage.setItem('token',response.token);
        this.authSvc.saveUser(
          {
            email:response.email,
            name:response.name
          }
        )
        console.log("REAL RESULTADO",response);
        this.router.navigate(['/home']);
      },(error)=>{
        alert("Email Already Exists, change the email");
      });

      if (user) {
      
        
        
      
      }
    } catch (error) {
      console.log(error);
    }
  }


  ngOnInit(): void {
    if(this.authSvc.logIn){
      this.router.navigate(['/home']);

    }


}
}
