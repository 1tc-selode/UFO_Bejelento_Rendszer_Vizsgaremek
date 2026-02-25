import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api';
  private tokenKey = 'auth_token';
  private user: User | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        if (res.access_token) {
          localStorage.setItem(this.tokenKey, res.access_token);
          this.user = null; // reset cache so getUser fetches fresh data
        }
      })
    );
  }

  register(data: Partial<User>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.user = null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): Observable<User | null> {
    if (this.user) return of(this.user);
    const token = this.getToken();
    if (!token) return of(null);
  return this.http.get<User>(`${this.apiUrl}/user`).pipe(
      tap(user => (this.user = user)),
      map(user => user || null)
    );
  }

  isAdmin(): Observable<boolean> {
    return this.getUser().pipe(map(user => user?.role === 'admin'));
  }
}
