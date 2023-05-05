import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/users.service';
import { ActivatedRoute,RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  //adding new user to the server
  editUser: any;

  //collecting data from the server
   constructor(private user: UsersService, private route: ActivatedRoute) { }
   users: any;
   ngOnInit(): void {
    this.user.getUserById(this.route.snapshot.params['id']).subscribe((data: any) => {
      console.log(data);

      //
      //adding new user to the server
    this.editUser =  new FormGroup({
      name : new FormControl(data['name']) ,
      email: new FormControl(data['email']),
      role: new FormControl(data['role']),
      imageUrl: new FormControl(data['imageUrl'])
    });
    });
   }
  

  //submitting the form
  msg: boolean = false;
  //this function is called when the form is submitted
   
   //this function is called when the form is submitted
   onUpdate(){
    this.user.updateUserData(this.editUser.value, this.route.snapshot.params['id']).subscribe((data: any) => {
      this.msg = true;
      this.removeMessageAfter5Sec();
      this.editUser.reset();
    });
   }
   //removing message after clicking on the button
   //removing message after 5 seconds
   removeMessageAfter5Sec(){
    setTimeout(() => {
      this.msg = false;
    }, 5000);
   }
  
   removeMessage(){
    this.msg = false;
   }
}
