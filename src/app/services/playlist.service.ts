import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private baseUrl = 'http://localhost:8088/api/v1/playlists'; // Địa chỉ API

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  // Lấy tất cả playlist
  getAllPlaylists(): Observable<any> {
    const token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}`, { headers });
  }

  // Lấy playlist theo ID
  getPlaylistById(playlistId: number): Observable<any> {
    const token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/${playlistId}`, { headers });
  }

  // Tạo một playlist mới
  createPlaylist(playlistData: any): Observable<any> {
    const token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}`, playlistData, { headers });
  }

  // Cập nhật playlist
  updatePlaylist(playlistId: number, playlistData: any): Observable<any> {
    const token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch(`${this.baseUrl}/${playlistId}/update`, playlistData, { headers });
  }

  // Tải lên hình ảnh cho playlist
  uploadPlaylistImage(playlistId: number, imageFile: File): Observable<any> {
    const token = this.tokenService.getToken(); 
    const formData = new FormData();
    formData.append('file', imageFile);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/upload-playlist-image/${playlistId}`, formData, { headers });
  }

  // Thêm bài hát vào playlist
  addSongsToPlaylist(playlistId: number, songIds: number[]): Observable<any> {
    const token = this.tokenService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch(`${this.baseUrl}/${playlistId}`, { song_ids: songIds }, { headers });
  }
}