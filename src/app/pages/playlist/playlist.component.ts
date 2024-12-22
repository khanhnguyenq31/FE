import { Component, OnInit } from '@angular/core';
import { SongsectionComponent } from "../../components/songsection/songsection.component";
import { SidebarsectionComponent } from "../../components/sidebarsection/sidebarsection.component";
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../services/playlist.service';
import { ApiResponse } from '../../responses/api.response';
import { DataStorageService } from '../../data-storage.service';
import { ArtistSongService } from '../../services/artist/song.service';
import { ArtistAlbumService } from '../../services/artist/album.service';
import { SongService } from '../../services/song.service';
import { RoleService } from '../../services/role.service';
@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [RouterLink, SidebarsectionComponent, CommonModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  songs: any[] = [];
  isLoading = true;
  playlistId: number = 0; // Gán giá trị mặc định
  playlistInfo: any; // Biến để lưu thông tin album
  artistName: string = ''; // Tên nghệ sĩ
  playlistImage: string = ''; // Hình ảnh album
  allSongs: any[] = []; // Danh sách bài hát của nghệ sĩ
  selectedSongs: number[] = []; // Danh sách ID bài hát đã chọn
  showModal: boolean = false; // Cờ để hiển thị modal
  role: string = ''; // Biến để lưu vai trò của người dùng
  constructor(
      private artistAlbumService: ArtistAlbumService,
      private playlistService: PlaylistService,
      private dataService: DataStorageService,
      private route: ActivatedRoute,
      private artistSongService: ArtistSongService,
      private songService : SongService,
      private roleService: RoleService,
  ) {}
  
  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.playlistId = +params['id'];
  
        this.playlistInfo = this.playlistService.getPlaylistInfo();
        if (this.playlistInfo) {
          this.artistName = this.playlistInfo.name;
          this.playlistImage = this.playlistInfo.cover_url;
        } else {
          console.log("không thấy thông tin playlist");
        }
  
        this.fetchSongs();
      });
      this.role = this.roleService.getRole();
  }

  fetchSongs(): void {
    this.playlistService.getPlaylistById(this.playlistId).subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'OK') {
          this.songs = response.data.songs;
        } else {
          console.error('Lỗi khi lấy bài hát:', response.message);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi:', err);
        this.isLoading = false;
      }
    });
  }

  playSelectedSong(song: any): void { // Sử dụng any cho tham số
    this.dataService.setSelectedSong(song); 
    this.dataService.setPlaylist(this.songs); // Truyền vào mảng bài hát
  } 

  playPlaylist(): void {
    if (this.songs.length > 0) {
      this.playSelectedSong(this.songs[0]);
    }
  }

  fetchAllSongs(): void {
    this.playlistService.getAllSongs().subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'OK') {
          this.allSongs = response.data.songs;
        } else {
          console.error('Lỗi khi lấy bài hát:', response.message);
        }
      },
      error: (err) => {
        console.error('Lỗi:', err);
      }
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
    if (this.showModal) {
      this.fetchAllSongs();
    }
  }

  toggleSongSelection(songId: number): void {
    const index = this.selectedSongs.indexOf(songId);
    if (index > -1) {
      this.selectedSongs.splice(index, 1);
    } else {
      this.selectedSongs.push(songId);
    }
  }
  
  addSongsToPlaylist(): void {
    this.playlistService.addSongsToPlaylist(this.playlistId, this.selectedSongs).subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'OK') {
          console.log('Thêm bài hát vào playlist thành công:', response);
          this.toggleModal();
          this.selectedSongs = [];
          this.fetchSongs();
        } else {
          console.error('Lỗi khi thêm bài hát vào playlist:', response.message);
        }
      },
      error: (err) => {
        console.error('Lỗi:', err);
      }
    });
  }
}
