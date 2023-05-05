import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user-list-home',
  templateUrl: './user-list-home.component.html',
  styleUrls: ['./user-list-home.component.css']
})
export class UserListHomeComponent {


  constructor(private user: UsersService) { }
  userData: any;
  ngOnInit(): void{
    this.user.getAllUsers().subscribe((allData) => {
      console.log(allData);
      this.userData = allData;
    });
  }
}
