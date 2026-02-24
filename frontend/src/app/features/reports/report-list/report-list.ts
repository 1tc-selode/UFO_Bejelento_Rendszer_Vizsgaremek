import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.html',
  styleUrls: ['./report-list.css'],
  imports: [CommonModule, FormsModule]
})
export class ReportListComponent {
  // Szűrők
  category: string = '';
  sortDate: 'asc' | 'desc' = 'desc';
  sortCredibility: 'asc' | 'desc' = 'desc';
  searchTitle: string = '';

  // Report adatok
  reports: any[] = [];

  // Példa: lekérdezés, szűrés, rendezés
  // Valós API integrációhoz a service-t kell használni
  filterReports() {
    // ... szűrés, rendezés, keresés logika ...
  }
}
