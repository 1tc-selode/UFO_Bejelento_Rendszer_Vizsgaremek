import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report';
import { VoteService } from '../../services/vote';
import { AuthService } from '../../services/auth';
import { CategoryService } from '../../services/category';

import type { Category } from '../../models/category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  getVoteCount(report: any): number {
    if (!report.votes) return 0;
    // A szavazatok tömbben minden user csak egyszer szerepelhet (backend így adja vissza)
    // Tehát a szavazatszám: up szavazatok száma - down szavazatok száma
    // Szavazatok összegzése: minden up +1, minden down -1
    return report.votes.reduce((sum: number, v: any) => sum + (v.vote_type === 'up' ? 1 : v.vote_type === 'down' ? -1 : 0), 0);
  }
    reports: any[] = [];
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
    getCategoryName(report: any): string {
    if (report.category && report.category.name) return report.category.name;
    const cat = this.categories.find(c => c.id === report.category_id);
    return cat ? cat.name : '';
  }

  
  goToDetails(report: any) {
    this.router.navigate(['/reports', report.id]);
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

    vote(report: any, type: 'up' | 'down') {
    this.voteService.vote(report.id!, type).subscribe((res: any) => {
      // Próbáljuk meg szinkronban lekérni a user-t az AuthService cache-ből
      let userId: number | undefined = (this.auth as any).user?.id;
      if (!userId) {
        // Ha nincs cache-ben, töltsük újra a reportokat
        this.loadReports();
        this.cdr.detectChanges();
        return;
      }
      // Keressük meg a user szavazatát
      let vote = report.votes?.find((v: any) => v.user_id === userId);
      if (vote) {
        vote.vote_type = type;
      } else {
        report.votes = report.votes || [];
        report.votes.push({ user_id: userId, report_id: report.id!, vote_type: type });
      }
      this.cdr.detectChanges();
    });
  }
}
