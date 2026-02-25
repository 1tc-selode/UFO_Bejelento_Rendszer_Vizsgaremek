import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css',
})
export class AdminCategories implements OnInit {
  categories: any[] = [];
  loading = true;
  error = '';
  editId: number|null = null;
  newCategory = { name: '', description: '' };
  editCategory = { name: '', description: '' };

  constructor(private categoryService: CategoryService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Nem sikerült lekérni a kategóriákat.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  startEdit(category: any) {
    this.editId = category.id;
    this.editCategory = { name: category.name, description: category.description };
  }

  cancelEdit() {
    this.editId = null;
    this.editCategory = { name: '', description: '' };
  }

  saveEdit(category: any) {
    this.categoryService.updateCategory(category.id, this.editCategory).subscribe(() => {
      this.loadCategories();
      this.cancelEdit();
      this.cdr.detectChanges();
    });
  }

  delete(category: any) {
    if (confirm('Biztosan törlöd ezt a kategóriát?')) {
      this.categoryService.deleteCategory(category.id).subscribe(() => {
        this.loadCategories();
        this.cdr.detectChanges();
      });
    }
  }

  create() {
    if (!this.newCategory.name.trim()) return;
    this.categoryService.createCategory(this.newCategory).subscribe(() => {
      this.loadCategories();
      this.newCategory = { name: '', description: '' };
      this.cdr.detectChanges();
    });
  }
}
