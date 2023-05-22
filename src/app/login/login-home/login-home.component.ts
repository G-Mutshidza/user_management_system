import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginsService } from 'src/app/logins.service';



@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent {
  constructor(private http: HttpClient,  private fb: FormBuilder, private route: Router) {}

  public loginForm!:  FormGroup
  public loginError: boolean = false
  loggedIn: boolean = false
  userLogged!: any 
  accessUrl!: string


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  msgDelete() {
    this.loginError = false
  }


  onSubmit() {
    //user login validation
    
    this.http.get<any>("http://localhost:8080/user-details").subscribe(res => {
      const user = res.find((a:any) => {
        //the outer if statement check to see if the entered values matches with the data on the database
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
          
      })
      console.log(user)
      //if the user login user is available in the database then redirect to designated route
      if (user) {
        this.userLogged = sessionStorage.getItem(user.name)
        console.log(this.userLogged)
        this.deleteMsg()
        this.loginForm.reset()
        this.loggedIn = true;
        this.route.navigate(['/user-home'])
      }
      else {
        this.loginError = true;
        this.deleteMsg()
        this.loginForm.reset()

      }
    }, err=>{
      alert()
    })
    

  }
    
  

  deleteMsg() {
    setTimeout(() => {
      this.loginError = false;
    },2500)
  }

  
}





