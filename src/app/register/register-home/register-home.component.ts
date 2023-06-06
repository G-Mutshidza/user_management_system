import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { UsersService } from 'src/app/users.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { error } from 'jquery'
import { AES } from 'crypto-js'
import { enc } from 'crypto-js'





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
  image ='https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1685103621~exp=1685104221~hmac=c6b8bc9a44692127fab9376a548c3cd55e6440ab85b678733b9d7553dbf1506c'

  ngOnInit(): void {
    
      this.signUpForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required ],
        phone:  ['', Validators.required],
        password: ['', Validators.required],
        role: ['Employee'],
        isActive: [false],
        logged: [false],
        accessrole: ['user'],
        imageUrl:  [this.image]
      })
      
  }
  //on submit, this function collects all the required data on the form and store them in the database
  onSubmit = () => {
    
    if(!this.signUpForm.controls['email'].value.match('(^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$)')){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'The email entered is invalid',
        showConfirmButton: false,
        timer: 2500
      })

      return
    }else {
      if(this.signUpForm.controls['password'].value.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')){
        
        //Encrypting password using crypto-js
        const key = 'keyUnlock'
        const encryptedPass = AES.encrypt(this.signUpForm.controls['password'].value, key).toString()
        

        this.signUpForm.controls['password'].setValue(encryptedPass) 
        
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
