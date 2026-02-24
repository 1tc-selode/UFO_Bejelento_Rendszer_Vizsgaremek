import { Component, Input } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.html',
  styleUrls: ['./report-card.css'],
  imports: [CommonModule, SlicePipe]
})
export class ReportCardComponent {
  @Input() report: any;
  @Input() isOwn: boolean = false;
  @Input() isAdmin: boolean = false;

  upvote() {
    // Fel szavazás logika
  }

  downvote() {
    // Le szavazás logika
  }

  edit() {
    // Szerkesztés logika
  }

  delete() {
    // Törlés logika
  }

  approve() {
    // Jóváhagyás logika
  }

  reject() {
    // Elutasítás logika
  }
}
