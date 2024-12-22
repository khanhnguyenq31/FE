import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { TokenService } from './token.service'; // Import TokenService if needed

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8088/api/v1'; // Base URL for the API

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  // Search songs by name
  searchSongsByName(name: string): Observable<ApiResponse> {
    const token = this.tokenService.getToken(); // Get token if needed
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ApiResponse>(`${this.apiUrl}/songs/search?name=${name}`, { headers });
  }

  // Search albums by name
  searchAlbumsByName(name: string): Observable<ApiResponse> {
    const token = this.tokenService.getToken(); // Get token if needed
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ApiResponse>(`${this.apiUrl}/albums/search?name=${name}`, { headers });
  }

  // Search playlists by name
  searchPlaylistsByName(name: string): Observable<ApiResponse> {
    const token = this.tokenService.getToken(); // Get token if needed
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ApiResponse>(`${this.apiUrl}/playlists/search?name=${name}`, { headers });
  }
}