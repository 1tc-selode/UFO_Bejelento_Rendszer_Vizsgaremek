import { Component, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  reports = [
    { id: 1, title: 'UFO Budapest felett', category: 'UFO', date: '2026-02-20', credibility: 4, votes: 10 },
    { id: 2, title: 'Fények az erdőben', category: 'Paranormális', date: '2026-02-18', credibility: 2, votes: -2 },
    { id: 3, title: 'Furcsa zajok', category: 'Hangjelenség', date: '2026-02-15', credibility: 3, votes: 3 },
  ];

  filter: string = '';

  upvote(report: any) {
    report.votes++;
  }
  downvote(report: any) {
    report.votes--;
  }

  get filteredReports() {
    const f = this.filter.toLowerCase();
    return this.reports.filter(r =>
      r.title.toLowerCase().includes(f) ||
      r.category.toLowerCase().includes(f)
    );
  }
}
