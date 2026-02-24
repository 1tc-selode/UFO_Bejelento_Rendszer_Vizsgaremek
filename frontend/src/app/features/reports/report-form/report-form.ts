import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.html',
  styleUrls: ['./report-form.css'],
  imports: [CommonModule, FormsModule]
})
export class ReportFormComponent {
  title: string = '';
  category: string = '';
  description: string = '';
  date: string = '';
  witnessCount: number = 0;
  latitude: number | null = null;
  longitude: number | null = null;
  images: File[] = [];

  errors: any = {};

  categories = [
    { value: 'ufo', label: 'UFO' },
    { value: 'paranormal', label: 'Paranormális' }
  ];

  validate() {
    this.errors = {};
    if (!this.title) this.errors.title = 'Cím kötelező';
    if (!this.category) this.errors.category = 'Kategória kötelező';
    if (!this.description || this.description.length < 20) this.errors.description = 'Leírás min. 20 karakter';
    if (this.latitude === null || this.longitude === null) this.errors.location = 'Lokáció kötelező';
  }

  onMapClick(event: any) {
    // Google Maps marker mozgatás logika
    this.latitude = event.lat;
    this.longitude = event.lng;
  }

  onImageChange(event: any) {
    this.images = Array.from(event.target.files);
  }

  save() {
    this.validate();
    if (Object.keys(this.errors).length === 0) {
      // Mentés logika
    }
  }

  cancel() {
    // Mégse logika
  }
}
