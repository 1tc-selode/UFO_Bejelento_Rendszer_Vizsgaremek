import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../../../services/statistics';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  stats: any = null;
  loading = true;
  error = '';

  constructor(private statisticsService: StatisticsService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.statisticsService.getStatistics().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Nem sikerült lekérni a statisztikákat.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
