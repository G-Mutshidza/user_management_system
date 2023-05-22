import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { UsersService } from 'src/app/users.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { error } from 'jquery'





@Component({
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.css']
})
export class RegisterHomeComponent implements OnInit {

  public signUpForm !: FormGroup
  constructor(private fb: FormBuilder, private user: UsersService, private router: Router) {}

  validClass = {
    lengClass: 'inactive', digitClass: 'inactive', lowerClass: 'inactive', upperClass: 'inactive', charClass: 'inactive'
  }

  errIcon = {
    lengIcon: 'fa-ban', digitIcon: 'fa-ban', lowerIcon: 'fa-ban', upperIcon: 'fa-ban', charIcon: 'fa-ban'
  }
  success: boolean = false
  unsuccess: boolean = false
  popup: any;

  
  

  ngOnInit(): void {
      this.signUpForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        cellNo:  ['', Validators.required],
        password: ['', Validators.required],
        role: ['user'],
        isActive: [false],
        accessrole: ['user'],
        imageUrl:  ['https://cdn.vectorstock.com/i/1000x1000/34/82/neutral-profile-picture-vector-23443482.webp']
      })
      
  }
  //on submit, this function collects all the required data on the form and store them in the database
  onSubmit = () => {
    
    this.user.signup(this.signUpForm.value).subscribe(res => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You are successfully registered',
        showConfirmButton: false,
        timer: 2500
      })
      console.log(this.user)
      this.router.navigate(['/sign-in'])
      this.signUpForm.reset()
    },
    err=> {
      this.unsuccess = true
    })
    
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
      // changes the font weight and text color to grey
      this.validClass.lengClass = 'inactive'
      this.validClass.digitClass = 'inactive'
      this.validClass.lowerClass = 'inactive'
      this.validClass.upperClass = 'inactive'
      this.validClass.charClass = 'inactive'
      // changes the icons of the labels to ban
      this.errIcon.lengIcon = 'fa-ban'
      this.errIcon.digitIcon = 'fa-ban'
      this.errIcon.lowerIcon = 'fa-ban'
      this.errIcon.upperIcon = 'fa-ban'
      this.errIcon.charIcon = 'fa-ban'
    } 
  }
}
