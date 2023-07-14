import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8000/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string ,role:string): Observable<any> {
    return this.http.post(AUTH_API + 'login/', {
      email,
      password,
      role
    }, httpOptions);
  }

  register(username: string, email: string, password: string ,role:string): Observable<any> {
    return this.http.post(AUTH_API + 'register/', {
      username,
      email,
      password,
      role
    }, httpOptions);
  }
}
