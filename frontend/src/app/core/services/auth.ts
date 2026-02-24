import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post('/api/register', data);
  }

  login(data: any): Observable<any> {
    return this.http.post('/api/login', data);
  }

  logout(): void {
    this.token = null;
    this.userSubject.next(null);
    localStorage.removeItem('token');
  }

  getUser(): any {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.token || !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'admin';
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }
}
