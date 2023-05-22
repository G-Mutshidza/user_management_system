import { Component } from '@angular/core';
import { LoginHomeComponent } from './login/login-home/login-home.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private isLogged: LoginHomeComponent, private router: Router) {}
  userLogged = this.isLogged.loggedIn
  isRequired = false
  signOut = false

  ngDoCheck(): void {
    let currentUrl = this.router.url;
    
    if (currentUrl == '/sign-in' ||currentUrl == '/sign-up' || currentUrl ) {
      this.isRequired = false;
    } else {
      this.signOut = true
      this.isRequired = true;
    }
    
  }

}
