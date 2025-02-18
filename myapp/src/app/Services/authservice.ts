import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7033/api/Login/users'; // Backend server URL

  constructor(private http: HttpClient) {}

  // Signup function
  signup(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password });
  }

  // Login function
  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { user});
  }
}
