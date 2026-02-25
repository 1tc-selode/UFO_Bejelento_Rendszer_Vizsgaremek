import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-details.html',
  styleUrl: './report-details.css',
})
export class ReportDetails implements OnInit {
  report: any = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private reportService: ReportService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.reportService.getReport(+id).subscribe({
        next: (report) => {
          this.report = report;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Nem található ilyen bejelentés.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.error = 'Hibás azonosító.';
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
