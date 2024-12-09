import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class UploadProfileImageService {
  private apiUrl = 'http://localhost:8088/api/v1/users/upload-profile-image';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  uploadProfileImage(file: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<ApiResponse>(this.apiUrl, formData, { headers });
  }
}
