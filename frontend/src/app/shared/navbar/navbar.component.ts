import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AuthService } from './../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent  {
  public user$=this.authSvc.user;

  constructor(public authSvc: AuthService, private router: Router) {
 
  }



  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
