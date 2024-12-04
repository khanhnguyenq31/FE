import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service'; // Nhập TokenService
import { ApiResponse } from '../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = "http://localhost:8088/api/v1/songs"
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllSong(): Observable<any>  {
    return this.http.get<ApiResponse>(`${this.apiUrl}`);
  }

  approveSong(song_id: number[]): Observable<any>  {
    const data = {
      song_id: song_id,
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

  rejectSong(song_id: number[]): Observable<any>  {
    const data = {
      song_id: song_id,
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
