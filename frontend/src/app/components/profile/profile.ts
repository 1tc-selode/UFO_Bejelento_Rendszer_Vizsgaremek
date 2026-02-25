import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ReportService } from '../../services/report';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: any = null;
  reports: any[] = [];
  loading = true;
  error = '';
  editMode = false;
  editUser: any = {};
  saveMsg = '';

  constructor(private auth: AuthService, private reportService: ReportService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.auth.getUser().subscribe(user => {
      this.user = user;
      if (user?.id) {
        this.reportService.getReports({ user_id: user.id }).subscribe(reports => {
          this.reports = reports;
          this.loading = false;
          this.cdr.detectChanges();
        });
      } else {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  enableEdit() {
    this.editMode = true;
    this.editUser = { ...this.user, password: '' };
    this.saveMsg = '';
  }

  saveProfile() {
    this.saveMsg = '';
    const data: any = { name: this.editUser.name, email: this.editUser.email };
    if (this.editUser.password) data.password = this.editUser.password;
    this.auth.updateProfile(data).subscribe({
      next: (res) => {
        this.saveMsg = 'Profil frissítve!';
        this.editMode = false;
        this.auth.getUser().subscribe(user => {
          this.user = user;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.saveMsg = 'Hiba a mentéskor!';
        this.cdr.detectChanges();
      }
    });
  }
}
