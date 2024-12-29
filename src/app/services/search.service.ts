import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8088/api/v1'; 

  constructor(private http: HttpClient, private tokenService: TokenService) { }
  
  private songs = new BehaviorSubject<Array<any>>([]);
  currentSongs$ = this.songs.asObservable();

  private albums = new BehaviorSubject<Array<any>>([]);
  currentAlbums$ = this.albums.asObservable();

  private playlists = new BehaviorSubject<Array<any>>([]);
  currentPlaylists$ = this.playlists.asObservable();

  setSearchTerm(value: string) {
    if (value) {
      this.searchSongsByName(value).subscribe((response: ApiResponse) => {
        this.songs.next(response.data);
      });

      this.searchAlbumsByName(value).subscribe((response: ApiResponse) => {
        this.albums.next(response.data);
      });

      this.searchPlaylistsByName(value).subscribe((response: ApiResponse) => {
        this.playlists.next(response.data);
      });

    }
  }

  searchSongsByName(name: string): Observable<ApiResponse> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}/songs/search?name=${name}`, { headers });
  }

  searchAlbumsByName(name: string): Observable<ApiResponse> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ApiResponse>(`${this.apiUrl}/albums/search?name=${name}`, { headers });
  }

  searchPlaylistsByName(name: string): Observable<ApiResponse> {
    const token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<ApiResponse>(`${this.apiUrl}/playlists/search?name=${name}`, { headers });
  }
}