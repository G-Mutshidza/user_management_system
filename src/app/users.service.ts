import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { LoginHomeComponent } from './login/login-home/login-home.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // the url of the server
  // collecting data from a server
  url = "http://localhost:8080/user-details"
  constructor(private http: HttpClient) { }
  //this function will get all the users from the server
  getAllUsers() {
    return this.http.get(this.url);
  }

  //this function will add a single user from the server
  addUser(data: any) {
    return this.http.post(this.url, data);
  };

  //this function will delete a single user from the server
  deleteUser(id: any) {
    return this.http.delete(this.url + "/" + id);
  };

  getUserById(id: any) {
    return this.http.get(this.url + "/" + id);
  }
  updateUserData(id: any, data: any) {
    return this.http.put(this.url + "/" + id, data);
  }
  // this function activate or deactivate a user
  userStatus(id: any, data: any) {
    return this.http.put(this.url + "/" + id, data);
  }

   //checking if the user is available
   userAvailable(name: string) {
    this.http.post<any>("http://localhost:8080/user-available", {name })
  }
   
  signup(data: any) {
    return this.http.post(this.url, data);
  }

  isLoggedIn(){
    return sessionStorage.getItem('username') != null
  }

  //user login
  login() {
    return this.http.get(this.url);
  }
   

}


