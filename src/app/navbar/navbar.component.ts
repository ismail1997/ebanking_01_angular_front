import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService : AuthenticationService, private router : Router){}
  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
