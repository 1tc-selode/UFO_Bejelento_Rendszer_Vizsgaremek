import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report';
import { VoteService } from '../../services/vote';
import { AuthService } from '../../services/auth';
import { CategoryService } from '../../services/category';
import type { Report } from '../../models/report.model';
import type { Category } from '../../models/category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  getVoteCount(report: Report): number {
    if (!report.votes) return 0;
    // A szavazatok tömbben minden user csak egyszer szerepelhet (backend így adja vissza)
    // Tehát a szavazatszám: up szavazatok száma - down szavazatok száma
    // Szavazatok összegzése: minden up +1, minden down -1
    return report.votes.reduce((sum: number, v: any) => sum + (v.vote_type === 'up' ? 1 : v.vote_type === 'down' ? -1 : 0), 0);
  }
  reports: Report[] = [];
  categories: Category[] = [];
  loading = false;
  isLoggedIn = false;

  constructor(
    private reportService: ReportService,
    private voteService: VoteService,
    private auth: AuthService,
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loadReports();
    });
  }
  getCategoryName(report: Report): string {
    if (report.category && report.category.name) return report.category.name;
    const cat = this.categories.find(c => c.id === report.category_id);
    return cat ? cat.name : '';
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
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  createReport() {
    this.router.navigate(['/create']);
  }

  vote(report: Report, type: 'up' | 'down') {
    this.voteService.vote(report.id!, type).subscribe(() => {
      this.loadReports();
      this.cdr.detectChanges();
    });
  }
}
