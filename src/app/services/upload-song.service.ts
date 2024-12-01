// upload_song.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // Nhập TokenService

@Injectable({
  providedIn: 'root'
})
export class UploadSongService {
  private apiUrl = 'http://localhost:8088/api/v1/songs';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  //up lên Cloudinary
  uploadSongToCloudinary(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    //Lấy token từ TokenService
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/cloudinary`, formData, { headers });
  }

  //lưu vào Database
  saveSongToDb(songData: any): Observable<any> {
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/uploads`, songData, { headers });
  }
}