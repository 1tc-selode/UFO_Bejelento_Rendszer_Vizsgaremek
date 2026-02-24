import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get isAdmin() {
    return this.auth.isAdmin();
  }

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
    // opcionális: navigáció login oldalra
  }
}
