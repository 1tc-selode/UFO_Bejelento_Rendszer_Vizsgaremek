import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: AuthService) {}

  login() {
    this.error = '';
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        if (res.token) {
          this.auth.setToken(res.token);
        }
      },
      error: () => {
        this.error = 'Hibás email vagy jelszó';
      }
    });
  }
}
