import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css'],
  imports: [CommonModule]
})
export class StatisticsComponent {
  totalReports: number = 0;
  mostCredible: any = null;
  leastCredible: any = null;
  categoryData: any[] = [];
  timeData: any[] = [];

  // Példa: API-ból lekérdezés logika
  // ngOnInit-ben tölthető be
}
