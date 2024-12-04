import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // Nhập TokenService
import { ApiResponse } from '../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class UploadAlbumService {
  private apiUrl = 'http://localhost:8088/api/v1/albums';

  constructor(private http: HttpClient, private tokenService: TokenService) {}


  // Tạo album mới
  createAlbum(albumData: any): Observable<ApiResponse> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse>(this.apiUrl, albumData, { headers });
  }

  // Upload hình ảnh album
  uploadAlbumImage(albumId: number, file: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<ApiResponse>(`${this.apiUrl}/upload-album-image/${albumId}`, formData, { headers });
  }


  // Thêm bài hát vào album
  addSongsToAlbum(albumId: number, songIds: number[]): Observable<ApiResponse> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      song_ids: songIds
    };

    return this.http.patch<ApiResponse>(`${this.apiUrl}/${albumId}/songs`, body, { headers });
  }
}