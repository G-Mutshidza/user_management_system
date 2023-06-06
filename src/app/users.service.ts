import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { LoginHomeComponent } from './login/login-home/login-home.component';
import { Observable, map } from 'rxjs';
import { User } from './User';
import { UserToEdit } from './Editable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
  httpOptions = {
    headers: this.headers
  }
  // the url of the server
  // collecting data from a server
  url = "http://localhost:8080/user-details"
  constructor(private http: HttpClient, private ln: LoginHomeComponent,) { }
  //this function will get all the users from the server
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  //this function will add a single user from the server
  addUser(data: User) {
    return this.http.post(this.url, data)
  }

  //this function will delete a single user from the server
  deleteUser(id: number) {
    return this.http.delete(this.url + "/" + id)
  }

  getUserById(id: any){
    return this.http.get(`${this.url}/${id}`)
  }
  
  updateUser(id: any, data: any){
    return this.http.put(`${this.url}/${id}`, data)
  }
   
  signup(data: any) {
    return this.http.post(this.url, data)
  }

  isLoggedIn(){
    return localStorage.getItem('username') != null
  }
  isNotLoggedIn() {
    return localStorage.getItem('username') === null
  }


}


