import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { LoginHomeComponent } from 'src/app/login/login-home/login-home.component';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/User';
import { UserToEdit } from 'src/app/Editable';
import { Router, ActivatedRoute } from '@angular/router';
import { Form, FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-user-list-home',
  templateUrl: './user-list-home.component.html',
  styleUrls: ['./user-list-home.component.css']
})
export class UserListHomeComponent {

  editForm!: FormGroup
  passForm!: FormGroup
  userId: string = ''
  adminIsLogged: boolean = false
  userIsLogged: boolean = false
  editClicked: boolean = false
  clicked = false
  passClick!: boolean


  constructor(private user: UsersService,  public login: LoginHomeComponent, private router: Router) { }
  userData: any;
  upData: any;
  username!: string
  

  ngOnInit(): void{
    this.userId = localStorage.getItem('userId')!
    this.username = localStorage.getItem('username')!

    this.user.getAllUsers().subscribe((allData) => {
      this.userData = allData;
    });

    this.user.getUserById(this.userId).subscribe((data) => {
      this.upData = data
    })

    this.editForm = new FormGroup({
      name: new FormControl(this.upData.name)!,
      email: new FormControl(this.upData.email),
      role: new FormControl(this.upData.role),
      phone: new FormControl(this.upData.phone),
      password: new FormControl(this.upData.password),
      accessrole: new FormControl(this.upData.accessrole),
      isActive: new FormControl(this.upData.isActive),
      logged: new FormControl(this.upData.logged),
      imageUrl: new FormControl(this.upData.imageUrl)
    
    })
    this.passForm = new FormGroup({
      password: new FormControl(''),
      newPassword: new FormControl(''),
      confPassword: new FormControl('')
    })


    

    
   

    localStorage.setItem('userIsLogged', 'user')

  }
  val: any
  onEditClick(id: any) {
    this.clicked = true
    this.passClick = false
    this.user.updateUser(this.editForm.value, id).subscribe((data) => {})
    
  }

  onPassClick() {
    this.passClick = true
    this.clicked = false
  }

  Cancel(){
    this.router.navigate([localStorage.getItem('url')])
  }
  

  onSignOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
