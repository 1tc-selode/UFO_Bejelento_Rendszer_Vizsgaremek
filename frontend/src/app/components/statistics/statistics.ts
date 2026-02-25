import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../../services/statistics';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})
export class Statistics implements OnInit {
  loading = true;
  error = '';
  totalReports: number = 0;
  mostCredible: any = null;
  mostIncredible: any = null;

  constructor(private statisticsService: StatisticsService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.statisticsService.getStatistics().subscribe({
      next: (stats) => {
        this.totalReports = stats.total_reports;
        this.mostCredible = stats.most_credible_report;
        this.mostIncredible = stats.most_incredible_report;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Hiba történt a statisztika lekérdezésekor.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
