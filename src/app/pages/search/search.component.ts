import { Component } from '@angular/core';
import { SidebarsectionComponent } from "../../components/sidebarsection/sidebarsection.component";
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { ApiResponse } from '../../responses/api.response';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../data-storage.service';
import { PlaylistService } from '../../services/playlist.service';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ SidebarsectionComponent, ProfilemenuComponent, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  songs: any[] = [];
  albums: any[] = [];
  playlists: any[] = [];
  hoveredSongIndex: number = -1;
  hoveredAlbumIndex: number = -1;
  hoveredPlaylistIndex: number = -1;

  constructor(private searchService: SearchService, private dataService: DataStorageService, private playlistService: PlaylistService, private albumService: AlbumService) {}

  onSearch() {
    if (this.searchTerm) {
      this.searchService.searchSongsByName(this.searchTerm).subscribe((response: ApiResponse) => {
        this.songs = response.data;
      });

      this.searchService.searchAlbumsByName(this.searchTerm).subscribe((response: ApiResponse) => {
        this.albums = response.data;
      });

      this.searchService.searchPlaylistsByName(this.searchTerm).subscribe((response: ApiResponse) => {
        this.playlists = response.data;
      });
    } else {
      // Nếu không có từ khóa tìm kiếm, xóa kết quả
      this.songs = [];
      this.albums = [];
      this.playlists = [];
    }
  }

  playSelectedSong(song: any): void {
    this.dataService.setSelectedSong(song); 
    this.dataService.setPlaylist(this.songs);
  }

  playPlaylist(playlistId: number): void {
  this.playlistService.getPlaylistById(playlistId).subscribe({
    next: (response: any) => {
      if (response.status === 'OK') {
        const songs = response.data.songs; // Lấy toàn bộ thông tin bài hát
        this.dataService.setPlaylist(songs); // Truyền vào mảng bài hát
        this.dataService.setSelectedSong(songs[0]); // Phát bài hát đầu tiên trong playlist
      } else {
        console.error('Error fetching playlist:', response.message);
      }
    },
    error: (error) => {
      console.error('Error fetching playlist:', error);
    }
  });
}

playAlbum(albumId: number): void {
  this.albumService.getSongsByAlbumId(albumId).subscribe({
    next: (response: any) => {
      if (response.status === 'OK') {
        const songs = response.data; // Lấy toàn bộ thông tin bài hát
        this.dataService.setPlaylist(songs); // Truyền vào mảng bài hát
        this.dataService.setSelectedSong(songs[0]); // Phát bài hát đầu tiên trong album
      } else {
        console.error('Error fetching album:', response.message);
      }
    },
    error: (error) => {
      console.error('Error fetching album:', error);
    }
  });
  }
}