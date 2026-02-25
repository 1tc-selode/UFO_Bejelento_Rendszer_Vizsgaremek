import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../services/report';
import { CategoryService } from '../../services/category';
import { AuthService } from '../../services/auth';
import type { Report } from '../../models/report.model';
import type { Category } from '../../models/category.model';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-form.html',
  styleUrl: './report-form.css',
})
export class ReportForm implements OnInit {
  categories: Category[] = [];
  report: Partial<Report> = {
    title: '',
    description: '',
    category_id: undefined,
    date: '',
    witnesses: 1,
    latitude: 0,
    longitude: 0
  };
  image: File | null = null;
  loading = false;
  error: string | null = null;
  isEdit = false;

  constructor(
    private reportService: ReportService,
    private categoryService: CategoryService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loading = true;
      this.reportService.getReport(+id).subscribe({
        next: (report) => {
          this.report = { ...report };
          this.loading = false;
        },
        error: () => {
          this.error = 'Nem található a bejelentés!';
          this.loading = false;
        }
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  submit() {
    if (!this.report.title || !this.report.description || !this.report.category_id || !this.report.date) {
      this.error = 'Minden mező kitöltése kötelező!';
      return;
    }
    // Koordináta validáció
    if (
      typeof this.report.latitude !== 'number' ||
      typeof this.report.longitude !== 'number' ||
      this.report.latitude < -90 || this.report.latitude > 90 ||
      this.report.longitude < -180 || this.report.longitude > 180
    ) {
      this.error = 'A szélesség (-90 és 90) és hosszúság (-180 és 180) között kell legyen!';
      return;
    }
    this.loading = true;
    this.error = null;
    const formData = new FormData();
    Object.entries(this.report).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, value as any);
    });
    if (this.image) formData.append('image', this.image);

    const req = this.isEdit && this.report.id
      ? this.reportService.updateReport(this.report.id, formData)
      : this.reportService.createReport(formData);

    req.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message || 'Hiba történt!';
      }
    });
  }
}
