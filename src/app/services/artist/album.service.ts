import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { ApiResponse } from '../../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class ArtistAlbumService {
  private apiUrl = 'http://localhost:8088/api/v1/albums';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getArtistAlbums(): Observable<ApiResponse> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ApiResponse>(`${this.apiUrl}/artist`, { headers });
  }

  //thêm bài hát vào album
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

  //cập nhật album
  updateAlbum(albumId: number, albumData: any): Observable<ApiResponse> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.patch<ApiResponse>(`${this.apiUrl}/${albumId}/update`, albumData, { headers });
  }
}