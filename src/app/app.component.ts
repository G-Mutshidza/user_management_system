import { Component } from '@angular/core';
import { LoginHomeComponent } from './login/login-home/login-home.component';
import { UserListHomeComponent } from './user-list/user-list-home/user-list-home.component';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Form, FormBuilder, FormGroup , Validators} from '@angular/forms';
import { User } from './User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private isLogged: LoginHomeComponent, private router: Router, private user: UsersService, private fb: FormBuilder) {}

  username!: string
  accessRole!: string
  isRequired = false
  signOut = false
  url!: string
  loggedUser!: boolean
  userId!: number
  data: User | undefined;
  users: User[] = []
  editClicked:  boolean = false;
  editForm!: FormGroup
  adminIsLogged = localStorage.getItem('adminIsLogged')
  userIsLogged = localStorage.getItem('userIsLogged')
  ngOnInit() {

    if(localStorage.getItem('username') !== null){
      this.router.navigate([localStorage.getItem('url')])
    }

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required]
    }
    );
    

    this.url = localStorage.getItem('url')!
    this.userId = Number(localStorage.getItem('userId'))!
    this.username = localStorage.getItem('username')!
    this.accessRole = localStorage.getItem('accessrole')!;

    if (localStorage.getItem('accessrole') === 'admin') {
      this.loggedUser = false
    }
    else {
      this.loggedUser = true
    }
  }
  

  ngDoCheck() {
    if(localStorage.getItem('username') === null) {
      return false
    }else {
      this.signOut = true
      return true
    }
  }

  onEditClick() {
    localStorage.setItem('editBtn', 'true')
    
    //get the user based on the id
    
    //populate the form with the data

    //
  }

  onSignOut() {
    localStorage.clear()
    this.signOut = false
    this.router.navigate(['/'])
  }

}
