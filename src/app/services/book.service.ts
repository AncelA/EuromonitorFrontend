import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Book } from '../models/book';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient,
    private authService: AuthService
    ) { }

  getCatalogue(): Observable<Book[]>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('euToken') });
    return this.http.get<Book[]>(`${environment.apiUrl}/Books/GetBooksListForUser`,{headers});
  }

  subscribe(id: number){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('euToken') });
    return this.http.post<any>(`${environment.apiUrl}/Subscriptions/Subscribe`, {bookID: id}, {headers});
  }

  unsubscribe(id: number){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('euToken') });
    return this.http.post<any>(`${environment.apiUrl}/Subscriptions/UnSubscribe`, {bookID: id}, {headers});
  }

  getSubscriptions(): Observable<Book[]>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('euToken') });
    return this.http.get<Book[]>(`${environment.apiUrl}/Subscriptions/GetSubscriptionsForUser`,{headers});
  }
}
