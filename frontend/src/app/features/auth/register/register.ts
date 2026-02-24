import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  error: string = '';

  constructor(private auth: AuthService) {}

  register() {
    this.error = '';
    if (this.password !== this.passwordConfirm) {
      this.error = 'A jelszavak nem egyeznek';
      return;
    }
    this.auth.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        if (res.token) {
          this.auth.setToken(res.token);
        }
      },
      error: () => {
        this.error = 'Regisztráció sikertelen';
      }
    });
  }
}
