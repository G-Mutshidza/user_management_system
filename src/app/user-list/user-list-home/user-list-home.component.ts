import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { LoginHomeComponent } from 'src/app/login/login-home/login-home.component';


@Component({
  selector: 'app-user-list-home',
  templateUrl: './user-list-home.component.html',
  styleUrls: ['./user-list-home.component.css']
})
export class UserListHomeComponent {

  constructor(private user: UsersService,  public login: LoginHomeComponent) { }
  userData: any;
  username: string = "";
  ngOnInit(): void{
    this.user.getAllUsers().subscribe((allData) => {
      console.log(allData);
      this.username += this.login.userLogged
      this.userData = allData;
    });
  }

  //activating or deactivating user from the server
  activateDeactivateUser(id: number, isActive: boolean){
    this.user.activateDeactivateUser(id, isActive).subscribe((data) => {
      this.ngOnInit();
    });
  }
}
