import { Component } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.css']
})
export class RegisterHomeComponent {
  constructor(private http: HttpClient, private router: Router) { }

  userAddString: string = "User Registered Successfully";

  userAddStringError: string = "User Registered Failed";
  userObject: object = {};
  
  addUser(user: any) {
    this.userObject = {
      "name": user.name,
      "email": user.email,
      "role": user.role,
      "imageUrl": user.imageUrl
    };
    this.http.get('http://localhost:8080/user-details', this.userObject).subscribe((Response) => {
      console.log(this.userObject);
      this.router.navigate(['/login']);
    })

    

  }
}
