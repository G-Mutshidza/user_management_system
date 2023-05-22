import { FormGroup } from "@angular/forms";

export class Validator{

    pwdCounter = 0;
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

    signUpForm!: FormGroup
    success = false

    constructor(){}

    onCheck(event: string){
        //validates for the password length
        if(event.match('^.{8,32}$')) {
          this.validClass.lengClass = 'success'
          this.errIcon.lengIcon = 'fa-check'
          this.pwdCounter++
        }
        else {
          if (this.pwdCounter > 0){
            this.pwdCounter--
          }
          this.validClass.lengClass = 'error'
          this.errIcon.lengIcon = 'fa-times'
        }
    
        //checks if the password contains lowercases
        if(event.match('[a-z]')) {
          this.validClass.lowerClass = 'success'
          this.errIcon.lowerIcon = 'fa-check'
          this.pwdCounter++
        }
        else {
          if (this.pwdCounter > 0){
            this.pwdCounter--
          }
          this.validClass.lowerClass = 'error'
          this.errIcon.lowerIcon = 'fa-times'
        }
        
        //checks if the password contains uppercases
        if(event.match('[A-Z]')) {
          this.validClass.upperClass = 'success'
          this.errIcon.upperIcon = 'fa-check'
          this.pwdCounter++
        }
        else {
          if (this.pwdCounter > 0){
            this.pwdCounter--
          }
          this.validClass.upperClass = 'error'
          this.errIcon.upperIcon = 'fa-times'
        }
    
        //checks if the password contains symbols
        if(event.match('[!@#$%^&*.?]')) {
          this.validClass.charClass = 'success'
          this.errIcon.charIcon = 'fa-check'
          this.pwdCounter++
        }
        else {
          if (this.pwdCounter > 0){
            this.pwdCounter--
          }
          this.validClass.charClass = 'error'
          this.errIcon.charIcon = 'fa-times'
        }
    
        //checks if the password contains digits
        if(event.match('[0-9]')) {
          this.validClass.digitClass = 'success'
          this.errIcon.digitIcon = 'fa-check'
          this.pwdCounter++
        }
        else {
          if (this.pwdCounter > 0){
            this.pwdCounter--
          }
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
          this.pwdCounter = 0
        } 
        if(this.pwdCounter === 5){
          this.success = true;
        }
      }
}