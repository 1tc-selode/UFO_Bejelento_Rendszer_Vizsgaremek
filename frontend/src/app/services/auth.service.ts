import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string, password: string }): Observable<{token: string, user: any}> {
    return this.http.post<{token: string, user: any}>(`${this.apiUrl}/login`, data);
  }

  register(data: { name: string, email: string, password: string, password_confirmation: string }): Observable<{token: string, user: any}> {
    return this.http.post<{token: string, user: any}>(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
