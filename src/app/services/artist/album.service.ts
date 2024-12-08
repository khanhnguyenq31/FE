import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { ApiResponse } from '../../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class ArtistAlbumService {
  private apiUrl = 'http://localhost:8088/api/v1/albums/artist';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getArtistAlbums(): Observable<ApiResponse> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ApiResponse>(this.apiUrl, { headers });
  }
}