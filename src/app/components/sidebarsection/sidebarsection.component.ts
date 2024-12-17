import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { ArtistAlbumService } from '../../services/artist/album.service';
import { PlaylistService } from '../../services/playlist.service'; // Import PlaylistService

@Component({
  selector: 'app-sidebarsection',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebarsection.component.html',
  styleUrls: ['./sidebarsection.component.css'],
})
export class SidebarsectionComponent {
  home: string = '';
  playlist: string = '';
  createlist: string = '';
  likedsongs: string = '';
  search: string = '';
  createAlbum: string = '';
  uploadSong: string = '';
  mySongs: string = '';
  myAlbums: string = '';
  myPlaylists: string = ''; // Đường dẫn đến trang playlists
  isArtist: boolean = false;
  albums: any[] = []; // Danh sách album
  playlists: any[] = []; // Danh sách playlist
  showAlbums: boolean = false; // Cờ để hiển thị các album
  showPlaylists: boolean = false; // Cờ để hiển thị các playlist
  
  constructor(
    private router: Router,
    private roleService: RoleService,
    private artistalbumService: ArtistAlbumService,
    private albumService: AlbumService,
    private playlistService: PlaylistService // Khởi tạo PlaylistService
  ) {
    const role = this.roleService.getRole();

    if (role === 'ADMIN') {
      this.home = '/afterlogin/adminpage';
      this.playlist = '/afterlogin/adminpage/playlist';
      this.createlist = '/afterlogin/adminpage/createlist';
      this.likedsongs = '/afterlogin/adminpage/likedsongs';
      this.search = '/afterlogin/adminpage/search';
    } else if (role === 'LISTENER') {
      this.home = '/afterlogin/listenerpage';
      this.playlist = '/afterlogin/listenerpage/playlist';
      this.createlist = '/afterlogin/listenerpage/createlist';
      this.likedsongs = '/afterlogin/listenerpage/likedsongs';
      this.search = '/afterlogin/listenerpage/search';

      // Lấy danh sách playlist
      this.fetchPlaylists();
    } else if (role === 'ARTIST') {
      this.isArtist = true;
      this.home = '/afterlogin/artistpage';
      this.playlist = '/afterlogin/artistpage/playlist';
      this.createlist = '/afterlogin/artistpage/createlist';
      this.likedsongs = '/afterlogin/artistpage/likedsongs';
      this.search = '/afterlogin/artistpage/search';
      this.createAlbum = '/afterlogin/artistpage/albums/new';
      this.uploadSong = '/afterlogin/artistpage/songs/new';
      this.mySongs = '/afterlogin/artistpage/songs';
      this.myAlbums = '/afterlogin/artistpage/albums';
      this.myPlaylists = '/afterlogin/artistpage/playlists'; // Đường dẫn đến playlists

      // Lấy danh sách album
      this.fetchAlbums();
      // Lấy danh sách playlist
      this.fetchPlaylists();
    }
  }

  // Lưu danh sách album
  fetchAlbums() {
    this.artistalbumService.getArtistAlbums().subscribe((response) => {
      if (response && response.data) {
        this.albums = response.data; 
      }
    });
  }

  //lấy danh sách playlist
  fetchPlaylists() {
    this.playlistService.getMyPlaylists().subscribe((response) => {
      if (response && response.data) {
        this.playlists = response.data; // Lưu danh sách playlist
      }
    });
  }


  toggleAlbumList() {
    this.showAlbums = !this.showAlbums;
  }

  togglePlaylistList() {
    this.showPlaylists = !this.showPlaylists;
  }

  
 navigateToAlbum(album: any) {
  this.albumService.setAlbumInfo(album);
  this.router.navigate([`/afterlogin/artistpage/albums/${album.id}`]);
  this.showAlbums=false;
  }

  navigateToPlaylist(playlist: any) {
  const role = this.roleService.getRole();
  this.playlistService.setPlaylistInfo(playlist);

  if (role === 'ARTIST') {
    this.router.navigate([`/afterlogin/artistpage/playlists/${playlist.id}`]);
  } else if (role === 'LISTENER') {
    this.router.navigate([`/afterlogin/listenerpage/playlists/${playlist.id}`]);
  }

  this.showPlaylists = false;
}
}