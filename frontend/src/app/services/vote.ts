import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VoteService {
  constructor(private http: HttpClient) {}

  vote(reportId: number, vote_type: 'up' | 'down'): Observable<any> {
    return this.http.post(`/api/reports/${reportId}/vote`, { vote_type });
  }

  getCredibility(reportId: number): Observable<any> {
    return this.http.get(`/api/reports/${reportId}/credibility`);
  }
}
