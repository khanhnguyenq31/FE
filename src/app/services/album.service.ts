import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // Nhập TokenService
import { ApiResponse } from '../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = "http://localhost:8088/api/v1/albums"
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllAbum(): Observable<any>  {
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/admin/all` , { headers });
  }

  approveAlbum(album_id: number[]): Observable<any>  {
    const data = {
      album_id: album_id,
    };
    //Lấy token từ TokenService
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log(JSON.stringify(data))
    return this.http.patch(`${this.apiUrl}/approve`, JSON.stringify(data) , { headers });
  }

  rejectAlbum(album_id: number[]): Observable<any>  {
    const data = {
      album_id: album_id,
    };

    //Lấy token từ TokenService
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log(JSON.stringify(data))
    return this.http.patch(`${this.apiUrl}/reject`, JSON.stringify(data) , { headers });
  }
}
