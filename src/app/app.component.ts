import { Component } from '@angular/core';
import { LoginHomeComponent } from './login/login-home/login-home.component';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private isLogged: LoginHomeComponent) {}
  userLogged = this.isLogged.loggedIn

}
