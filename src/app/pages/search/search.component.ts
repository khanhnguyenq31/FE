import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../data-storage.service';
import { PlaylistService } from '../../services/playlist.service';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  constructor(private searchService: SearchService,
              private dataService: DataStorageService, 
              private playlistService: PlaylistService, 
              private albumService: AlbumService) {
  }

  songs: any[] = [];
  albums: any[] = [];
  playlists: any[] = [];
  
  hoveredSongIndex: number = -1;
  hoveredAlbumIndex: number = -1;
  hoveredPlaylistIndex: number = -1;

  ngOnInit(): void {
    this.searchService.currentSongs$.subscribe(newSongs => {
      this.songs = newSongs
      console.log(this.songs)
    })

    this.searchService.currentAlbums$.subscribe(newAlbums => {
      this.albums = newAlbums
    })

    this.searchService.currentPlaylists$.subscribe(newPlaylists => {
      this.playlists = newPlaylists
    })
  }

  playSelectedSong(song: any): void {
    this.dataService.setSelectedSong(song); 
    this.dataService.setPlaylist(this.songs);
  }

  playPlaylist(playlistId: number): void {
  this.playlistService.getPlaylistById(playlistId).subscribe({
    next: (response: any) => {
      if (response.status === 'OK') {
        const songs = response.data.songs; 
        this.dataService.setPlaylist(songs); 
        this.dataService.setSelectedSong(songs[0]);
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