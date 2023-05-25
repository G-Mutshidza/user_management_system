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
  counter: number = 0;

  
  

  ngOnInit(): void {
      this.signUpForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone:  ['', Validators.required],
        password: ['', Validators.required],
        role: ['Employee'],
        isActive: [false],
        logged: [false],
        accessrole: ['user'],
        imageUrl:  ['https://images.unsplash.com/photo-1583243552802-94ccb4200150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80']
      })
      
  }
  //on submit, this function collects all the required data on the form and store them in the database
  onSubmit = () => {

    if(this.signUpForm.errors){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'An error has occurred',
        showConfirmButton: false,
        timer: 2500
      })

      return
    }else {
      if(this.signUpForm.controls['password'].value.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')){
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
          this.success = false
          this.unsuccess = true
        })
      }else{
        this.signUpForm.controls['password'].reset()
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Check your password',
          showConfirmButton: false,
          timer: 3500
        })
      }
      
    }
    
  }

  onCheck(event: string){
    //validates for the password length
    if(event.match('^.{8,32}$')) {
      this.validClass.lengClass = 'success'
      this.errIcon.lengIcon = 'fa-check'
      this.counter += 1 
    }
    else {
          this.validClass.lengClass = 'error'
          this.errIcon.lengIcon = 'fa-times'

          if(this.counter > 0){
            this.counter -= 1
          }else if(this.counter == 0){
            this.counter = 0
          }
        }

    //checks if the password contains lowercases
    if(event.match('[a-z]')) {
      this.validClass.lowerClass = 'success'
      this.errIcon.lowerIcon = 'fa-check'
      this.counter += 1
    }
    else {
          this.validClass.lowerClass = 'error'
          this.errIcon.lowerIcon = 'fa-times'

          if(this.counter > 0){
            this.counter -= 1
          }else if(this.counter == 0){
            this.counter = 0
          }
        }
    
    //checks if the password contains uppercases
    if(event.match('[A-Z]')) {
      this.validClass.upperClass = 'success'
      this.errIcon.upperIcon = 'fa-check'
      this.counter += 1
    }
    else {
          this.validClass.upperClass = 'error'
          this.errIcon.upperIcon = 'fa-times'

          if(this.counter > 0){
            this.counter -= 1
          }else if(this.counter == 0){
            this.counter = 0
          }
        }

    //checks if the password contains symbols
    if(event.match('[!@#$%^&*.?]')) {
      this.validClass.charClass = 'success'
      this.errIcon.charIcon = 'fa-check'
      this.counter += 1
    }
    else {
          this.validClass.charClass = 'error'
          this.errIcon.charIcon = 'fa-times'

          if(this.counter > 0){
            this.counter -= 1
          }else if(this.counter == 0){
            this.counter = 0
          }
        }

    //checks if the password contains digits
    if(event.match('[0-9]')) {
      this.validClass.digitClass = 'success'
      this.errIcon.digitIcon = 'fa-check'
      this.counter += 1
    }
    else {
          this.validClass.digitClass = 'error'
          this.errIcon.digitIcon = 'fa-times'

          if(this.counter > 0){
            this.counter -= 1
          }else if(this.counter == 0){
            this.counter = 0
          }
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
