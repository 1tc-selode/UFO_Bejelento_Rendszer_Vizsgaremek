import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  user: User | null = null;
  isLoggedIn = false;
  isAdmin = false;


  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
    this.checkAuth();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuth();
      }
    });
  }
  navigate(path: string, event?: Event) {
    if (event) event.preventDefault();
    this.router.navigate([path]);
  }

  async checkAuth() {
    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn) {
      this.auth.getUser().subscribe(user => {
        this.user = user;
        this.isAdmin = !!user && user.role === 'admin';
        this.cdr.detectChanges();
      });
    } else {
      this.user = null;
      this.isAdmin = false;
      this.cdr.detectChanges();
    }
  }

  logout() {
    this.auth.logout();
    this.checkAuth();
    this.cdr.detectChanges();
  }
}
