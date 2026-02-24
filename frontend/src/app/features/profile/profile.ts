import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [CommonModule]
})
export class ProfileComponent {
  user = {
    name: 'Teszt Elek',
    email: 'teszt.elek@example.com',
    role: 'user',
    registeredAt: '2026-01-01',
  };

  myReports: any[] = [
    { title: 'UFO a Balaton felett', category: 'ufo', date: '2026-02-01', credibility: 5 },
    { title: 'Fények az erdőben', category: 'paranormal', date: '2026-01-15', credibility: 3 }
  ];

  // Valós API integrációhoz AuthService és ReportService szükséges
}
