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

  public loginForm!:  FormGroup;
  public loginError: boolean = false;
  loggedIn: boolean = false;
  userLogged: string = '';


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  msgDelete() {
    this.loginError = false;
  }


  onSubmit() {
    //user login validation
    this.http.get<any>("http://localhost:8080/user-details").subscribe(res => {
      const user = res.find((a:any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      
      if (user) {
        localStorage.setItem('userLogged', this.userLogged)
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

    //admin login validation
    this.http.get<any>("http://localhost:8080/admin-details").subscribe(res => {
      const admin = res.find((a:any) => {
        this.userLogged = a.name;
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })
      
      if (admin) {
        localStorage.setItem('userLogged', this.userLogged)
        this.deleteMsg()
        this.loginForm.reset()
        this.loggedIn = true;
        this.route.navigate(['/admin-home'])
      }
      else {
        this.loginError = true;
        this.deleteMsg()
        this.loginForm.reset()

      }
    }, err => {
      alert()
    })
  }
    
  

  deleteMsg() {
    setTimeout(() => {
      this.loginError = false;
    },2500)
  }

  
}





