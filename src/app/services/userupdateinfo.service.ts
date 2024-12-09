import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments'; // Adjust the path as necessary
import { ApiResponse } from '../responses/api.response'; // Adjust the path as necessary


@Injectable({
  providedIn: 'root'
})
export class UserupdateinfoService {
  private apiUrl = `${environment.apiBaseUrl}/users/info/update`;

  constructor(private http: HttpClient) {}

  updateUserInfo(token: string, userInfo: { username: string; email: string; password: string; country: string; date_of_birth: string }): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch<ApiResponse>(this.apiUrl, userInfo, { headers });
  }
}
