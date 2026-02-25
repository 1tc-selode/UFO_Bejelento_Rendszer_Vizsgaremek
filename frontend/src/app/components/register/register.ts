import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Register {
  name = '';
  email = '';
  password = '';
  password_confirmation = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Hiba a regisztráció során!';
      }
    });
  }
}
