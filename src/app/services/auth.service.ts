import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environment/environment';
import { User } from '../models/user';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/Users/Login`, {emailAddress: email, password: password}, this.httpOptions);
  }

  register(firstname: string, lastname: string, email: string, password: string){
    return this.http.post<any>(`${environment.apiUrl}/Users/RegisterUser`, {emailAddress: email, password: password, firstName: firstname, lastName: lastname}, this.httpOptions);
  }

  logout() {
    localStorage.removeItem('euToken');
  }
}
