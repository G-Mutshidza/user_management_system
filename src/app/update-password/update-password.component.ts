import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AES } from 'crypto-js';
import { enc } from 'crypto-js'



@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  constructor(private api: UsersService, private route: ActivatedRoute, private rt: Router) { }

  buttonText = "Cancel"
  password!: string

  EditForm = new FormGroup({
    name:  new FormControl(''),
    email:  new FormControl(''),
    role:   new FormControl(''),
    phone:  new FormControl(''),
    oldPassword:  new FormControl(''),
    password: new FormControl(''),
    confPass: new FormControl(''),
    accessrole: new FormControl(''),
    isActive:  new FormControl(''),
    imageUrl:  new FormControl('')
  })

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
    this.api.getUserById(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.EditForm = new FormGroup({
        name:  new FormControl(data.name),
        email:  new FormControl(data.email),
        role:   new FormControl(data.role),
        phone:  new FormControl(data.phone),
        oldPassword:  new FormControl(''),
        password: new FormControl(''),
        confPass: new FormControl(''),
        accessrole: new FormControl(data.accessrole),
        isActive:  new FormControl(data.isActive),
        imageUrl:  new FormControl(data.imageUrl)
      })

      
    })
  }

  onEditSubmit(){
    this.buttonText = "Close"
    console.log(this.EditForm.value)

    const encryptedPass = localStorage.getItem('pass')!
    const key = 'keyUnlock'
    const decryptBytes = AES.decrypt(encryptedPass, key)
    const decryptedPassword = decryptBytes.toString(enc.Utf8)


    if(this.EditForm.value.oldPassword !== decryptedPassword){
      //Pop up message after deleting the user
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Your Old password is incorrect!',
        showConfirmButton: false,
        timer: 3500
      })
      return
    }else{ 
      if(this.EditForm.value.password !== this.EditForm.value.confPass){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Your passwords do not match!',
          showConfirmButton: false,
          timer: 3500
        })
        return
      }else {

        this.EditForm.controls['confPass'].setValue(null)
        this.EditForm.controls['oldPassword'].setValue(null)
        
        this.password = this.EditForm.controls['password'].value!
        //check if the new password matched the regex
        if(this.password.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')!){

          const encryptedPass = AES.encrypt(this.EditForm.controls['password'].value!, key).toString()
          this.EditForm.controls['password'].setValue(encryptedPass)
          this.api.updateUser(this.route.snapshot.params['id'], this.EditForm.value).subscribe((data: any) => {})

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Password updated successfully!',
            showConfirmButton: false,
            timer: 3500
          })

          this.EditForm.reset()
        }
        else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Your password is weak!',
            showConfirmButton: false,
            timer: 3500
          })

          this.EditForm.reset()
        }
        
      }
    }

  }

  Cancel(){
    this.rt.navigate([localStorage.getItem('url')])
  }


}
