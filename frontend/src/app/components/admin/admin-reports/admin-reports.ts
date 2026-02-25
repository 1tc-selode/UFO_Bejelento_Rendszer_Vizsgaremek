import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReportService } from '../../../services/report';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.css',
})
export class AdminReports implements OnInit {
  reports: any[] = [];
  loading = true;
  error = '';

  constructor(private reportService: ReportService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.loading = true;
    this.reportService.getReports().subscribe({
      next: (reports) => {
        this.reports = reports;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Nem sikerült lekérni a bejelentéseket.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  approve(report: any) {
    this.reportService.updateReport(report.id, { ...report, status: 'approved' }).subscribe(() => {
      this.loadReports();
      this.cdr.detectChanges();
    });
  }

  delete(report: any) {
    if (confirm('Biztosan törlöd ezt a bejelentést?')) {
      this.reportService.deleteReport(report.id).subscribe(() => {
        this.loadReports();
        this.cdr.detectChanges();
      });
    }
  }

  edit(report: any) {
    this.router.navigate(['/edit', report.id]);
    this.cdr.detectChanges();
  }
}
