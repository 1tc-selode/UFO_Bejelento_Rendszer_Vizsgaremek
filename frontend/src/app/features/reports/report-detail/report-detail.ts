import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.html',
  styleUrls: ['./report-detail.css'],
  imports: [CommonModule]
})
export class ReportDetailComponent {
  @Input() report: any;
  @Input() isAdmin: boolean = false;

  modalImg: string | null = null;
  userVoted: 'up' | 'down' | null = null;

  openModal(img: string) {
    this.modalImg = img;
  }

  closeModal() {
    this.modalImg = null;
  }

  upvote() {
    this.userVoted = 'up';
    // Real-time pontszám frissítés logika
  }

  downvote() {
    this.userVoted = 'down';
    // Real-time pontszám frissítés logika
  }

  deleteReport() {
    // Admin törlés logika
  }
}
