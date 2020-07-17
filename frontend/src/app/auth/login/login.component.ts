import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email] ),
    password: new FormControl('',Validators.required),
  });
  constructor(private authSvc: AuthService, private router: Router) {}

  

  async onLogin() {
    const { email, password } = this.loginForm.value;
  
    try {
      const user = await this.authSvc.login(email, password ).subscribe((response)=>{
        localStorage.setItem('token',response.token);
        localStorage.setItem('email',response.email);
        localStorage.setItem('name',response.name);
  
   


        this.authSvc.saveUser(
          {
            email:response.email,
            name:response.name
          }
        )
        console.log("REAL RESULTADO",response);
        this.router.navigate(['/home']);
      },(error)=>{
        alert("Change email or password");
      });
     
      if(user){
        
       

        
     
        
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
