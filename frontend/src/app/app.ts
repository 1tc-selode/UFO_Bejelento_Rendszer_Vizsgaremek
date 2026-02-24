
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, Router, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  currentUser: { name: string, admin?: boolean } | null = null;

  constructor(private router: Router) {
    this.loadUser();
    // Frissítsd a user állapotot minden navigáció után
    this.router.events.subscribe(() => {
      this.loadUser();
    });
  }

  loadUser() {
    const user = localStorage.getItem('user');
    this.currentUser = user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  isAdmin(): boolean {
    return !!this.currentUser?.admin;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}