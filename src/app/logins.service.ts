import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginsService {

  url = "http://localhost:8080/user-login"
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.url);
  }

  registerUser(data: any) {
    return this.http.post(this.url, {});
  }
  
}
