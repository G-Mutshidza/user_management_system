import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';





@Component({
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.css']
})
export class RegisterHomeComponent implements OnInit {

  public signUpForm !: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}


  
  validClass = {
    lengClass: 'inactive',
    digitClass: 'inactive',
    lowerClass: 'inactive',
    upperClass: 'inactive',
    charClass: 'inactive'
  }

  errIcon = {
    lengIcon: 'fa-ban',
    digitIcon: 'fa-ban',
    lowerIcon: 'fa-ban',
    upperIcon: 'fa-ban',
    charIcon: 'fa-ban'
  }

  success: boolean = false;
  unsuccess: boolean = false;
  progress: number = 0;
  progressClass: string = ''

  ngOnInit(): void {
      this.signUpForm = this.fb.group({
        name: ['',Validators.required, Validators.minLength(3)],
        email: ['',Validators.required,  Validators.email,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        cellNo:  ['',Validators.required, Validators.pattern('^[0-9]{10}$')],
        password: ['',Validators.required,  Validators.minLength(8),   Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')]
      })
      
  }

  onSubmit = () => {
    this.http.post('http://localhost:8080/user-details', this.signUpForm.value)
    .subscribe(res => {
      
      this.onRegSuccess();
      this.signUpForm.reset();
    },
    err=> {
      this.unsuccess = true;
    })
    
  }


  onRegSuccess = () => {
    this.success = true;
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000)
  }

  onCheck(event: string){
    //validates for the password length
    if(event.match('^.{8,32}$')) {
      this.validClass.lengClass = 'success'
      this.errIcon.lengIcon = 'fa-check'
    }
    else {
      this.validClass.lengClass = 'error'
      this.errIcon.lengIcon = 'fa-times'
    }

    //checks if the password contains lowercases
    if(event.match('[a-z]')) {
      this.validClass.lowerClass = 'success'
      this.errIcon.lowerIcon = 'fa-check'
    }
    else {
      this.validClass.lowerClass = 'error'
      this.errIcon.lowerIcon = 'fa-times'
    }
    
    //checks if the password contains uppercases
    if(event.match('[A-Z]')) {
      this.validClass.upperClass = 'success'
      this.errIcon.upperIcon = 'fa-check'
    }
    else {
      this.validClass.upperClass = 'error'
      this.errIcon.upperIcon = 'fa-times'
    }

    //checks if the password contains symbols
    if(event.match('[!@#$%^&*.?]')) {
      this.validClass.charClass = 'success'
      this.errIcon.charIcon = 'fa-check'
    }
    else {
      this.validClass.charClass = 'error'
      this.errIcon.charIcon = 'fa-times'
    }

    //checks if the password contains digits
    if(event.match('[0-9]')) {
      this.validClass.digitClass = 'success'
      this.errIcon.digitIcon = 'fa-check'
    }
    else {
      this.validClass.digitClass = 'error'
      this.errIcon.digitIcon = 'fa-times'
    }

    //checks if the textfield is empty
    //if empty, the password requirement labels should be greyed out
    if(this.signUpForm.controls['password'].dirty && this.signUpForm.hasError('required','password')){
      this.validClass.lengClass = 'inactive'
      this.validClass.digitClass = 'inactive'
      this.validClass.lowerClass = 'inactive'
      this.validClass.upperClass = 'inactive'
      this.validClass.charClass = 'inactive'

      this.errIcon.lengIcon = 'fa-ban'
      this.errIcon.digitIcon = 'fa-ban'
      this.errIcon.lowerIcon = 'fa-ban'
      this.errIcon.upperIcon = 'fa-ban'
      this.errIcon.charIcon = 'fa-ban'
      this.progress = 0
    } 
  }
}
