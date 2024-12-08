import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album.service';
import { ArtistAlbumService } from '../../services/artist/album.service';
@Component({
  selector: 'app-sidebarsection',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebarsection.component.html',
  styleUrl: './sidebarsection.component.css',
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
  isArtist: boolean = false;
  albums: any[] = []; // Danh sách album
  showAlbums: boolean = false; // Cờ để hiển thị các album

  constructor(
    private router: Router,
    private roleService: RoleService,
    private artistalbumService: ArtistAlbumService
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

      // Lấy danh sách album
      this.fetchAlbums();
    }
  }

  fetchAlbums() {
    this.artistalbumService.getArtistAlbums().subscribe((response) => {
      if (response && response.data) {
        this.albums = response.data; // Lưu danh sách album
      }
    });
  }

  toggleAlbumList() {
    this.showAlbums = !this.showAlbums;
  }

  navigateToAlbum(albumId: number) {
    this.router.navigate([`/afterlogin/artistpage/albums/${albumId}`]);
  }
}
