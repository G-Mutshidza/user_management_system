import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-management-home',
  templateUrl: './user-management-home.component.html',
  styleUrls: ['./user-management-home.component.css']
})
export class UserManagementHomeComponent {

  constructor(private user: UsersService, private router: Router) {}
  
  //collecting data from the server
  userData!: any;
  name!: string;
  page: number = 1;
  items: number = 5;
  username!: string
  

  ngOnInit(): void{
    this.user.getAllUsers().subscribe((allData: any) => {
      this.userData = allData;
    });
    this.username = localStorage.getItem('username')!;
    

  }
  
  // changing the status of the user
  onChange(id: number, status: boolean){
    
  }
  // searching the data using the name
  Search(){
    if(this.name == ""){
      this.ngOnInit();
    } else {
      this.userData = this.userData.filter((res: any) => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())!;
      })
    }
  }

  //sorting the data
  key: string = 'id'
  reverse = false
  Sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //changing the number of items per page
  NumFilter(event: any){

    if(event == ""){
      this.ngOnInit();
    }else if(event < 0){
      alert("Please enter a valid number");
      this.items = 5;
    }else if(event > this.userData.length){
      alert("Please enter a valid number");
      this.items = this.userData.length;
    }else if(event > 0){
      this.items = event;
    }else if(event == 0){
      this.items = 0;
    }
    
  }

  //
  //submitting the form
  msg: boolean = false;
  //this function is called when the form is submitted
   
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
   //deleting user from the server
   deleteUser(id: number){
    this.user.deleteUser(id).subscribe((data) => {
      this.ngOnInit();
    });
    //Pop up message after deleting the user
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'User deleted successfully',
      showConfirmButton: false,
      timer: 2500
    })

  }
  results!: string
  isActive() {
   
    if(this.userData.isActive === true){
      return true
    }else {
      return false
    }
  }

  onSignOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }


}