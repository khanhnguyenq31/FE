import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { ApiResponse } from '../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  private apiUrl = `${environment.apiBaseUrl}/users/details`;

  constructor(private http: HttpClient) {}

  getUserDetails(token: string): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ApiResponse>(this.apiUrl, { headers });
  }
}