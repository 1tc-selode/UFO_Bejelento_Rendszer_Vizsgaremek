import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = '/api/reports';

  constructor(private http: HttpClient) {}

  getReports(params?: any): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl, { params });
  }

  getReport(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${id}`);
  }

  createReport(data: FormData | Report): Observable<Report> {
    return this.http.post<Report>(this.apiUrl, data);
  }

  updateReport(id: number, data: FormData | Report): Observable<Report> {
    return this.http.put<Report>(`${this.apiUrl}/${id}`, data);
  }

  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadImage(reportId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`/api/reports/${reportId}/images`, formData);
  }
}
