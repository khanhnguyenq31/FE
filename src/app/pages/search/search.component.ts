import { Component } from '@angular/core';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { SidebarsectionComponent } from "../../components/sidebarsection/sidebarsection.component";
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { RouterLink } from '@angular/router';
import { ApiResponse } from '../../responses/api.response';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../data-storage.service';
import { PlaylistService } from '../../services/playlist.service';
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

  constructor(private searchService: SearchService, private dataService: DataStorageService, private playlistService: PlaylistService) {}

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

  playSelectedSong(songUrl: string): void { 
    this.dataService.setSelectedSong(songUrl); 
    this.dataService.setPlaylist(this.songs.map(song => song.secure_url)); 
  }

  playPlaylist(playlistId: number): void {
    this.playlistService.getPlaylistById(playlistId).subscribe((response: any) => {
      const songUrls = response.data.songs.map((song: { secure_url: string }) => song.secure_url);
      this.dataService.setPlaylist(songUrls);
      this.dataService.setSelectedSong(songUrls[0]); // Phát bài hát đầu tiên trong playlist
    });
  }

  playAlbum(): void {
    if (this.songs.length > 0) {
      this.playSelectedSong(this.songs[0].secure_url);
    }
  }
}
