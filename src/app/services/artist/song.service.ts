import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { ApiResponse } from '../../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class ArtistSongService {
  private apiUrl = 'http://localhost:8088/api/v1/songs/artist';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getArtistSongs(): Observable<ApiResponse> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ApiResponse>(this.apiUrl, { headers });
  }
}