import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  constructor(private api: UsersService, private route: ActivatedRoute, private rt: Router) { }

  buttonText = "Cancel"

  EditUser = new FormGroup({
    name:  new FormControl(''),
    email:  new FormControl(''),
    role:   new FormControl(''),
    phone:  new FormControl(''),
    password:  new FormControl(''),
    accessrole: new FormControl(''),
    isActive:  new FormControl(''),
    imageUrl:  new FormControl('')
  })

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
    this.api.getUserById(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.EditUser = new FormGroup({
        name:  new FormControl(data.name),
        email:  new FormControl(data.email),
        role:   new FormControl(data.role),
        phone:  new FormControl(data.phone),
        password:  new FormControl(data.password),
        accessrole: new FormControl(data.accessrole),
        isActive:  new FormControl(data.isActive),
        imageUrl:  new FormControl(data.imageUrl)
      })
    })
  }

  onEditSubmit(){
    this.buttonText = "Close"
    console.log(this.EditUser.value)
    this.api.updateUser(this.route.snapshot.params['id'], this.EditUser.value).subscribe((data: any) => {})
  }

  Cancel(){
    this.rt.navigate([localStorage.getItem('url')])
  }
}
