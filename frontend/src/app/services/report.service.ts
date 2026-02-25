import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  apiUrl = 'http://127.0.0.1:8000/api/reports';

  constructor(private http: HttpClient) {}

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createReport(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
