import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { LoginsService } from 'src/app/logins.service';
import Swal from 'sweetalert2';



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
  userLogged!: string 
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
    
    this.http.get<User[]>("http://localhost:8080/user-details?email="+this.loginForm.value.email).subscribe(res => {
      
      const users: User[] = res
      const user = users[0];
      console.log(user)
      //if the user login user is available in the database then redirect to designated route
      if (user) {
        if(user.password === this.loginForm.value.password){

          if (user.accessrole === 'admin') {
            this.accessUrl = '/admin-home'
          }else if (user.accessrole === 'user')  {
            this.accessUrl = '/user-home'
          }
          this.deleteMsg()
          this.loginForm.reset()    
          this.route.navigate([this.accessUrl])
        
          localStorage.setItem('username', user.name)
          localStorage.setItem('accessrole', user.accessrole)
          localStorage.setItem('url', this.accessUrl)
          localStorage.setItem('userId', user.id)
          // sessionStorage.setItem('logged', user.logged)
          // // class from sweet alert to display a message to the user 
          // and to redirect to the designated route 
          // after the user logged in successfully
          Swal.fire({
            position: 'center',
            icon: 'success', 
            title: user.name + ' have successfully logged in',
            showConfirmButton: false,
            timer: 2500
          })
        }
        else {

          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Email or Password is incorrect',
            showConfirmButton: true,
            timer: 2500
          })
  
          this.loginError = true;
          this.deleteMsg()
          this.loginForm.controls['password'].reset()
  
        }
        

      }
      
    }, err=>{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Your passwords do not match!',
        showConfirmButton: false,
        timer: 3500
      })
    })
  }
    
  deleteMsg() {
    setTimeout(() => {
      this.loginError = false;
    },2500)
  }

  
}





