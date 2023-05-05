import { Component } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginsService } from 'src/app/logins.service';



@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent {
  constructor(private login: LoginsService) {}
  
  
 
}
