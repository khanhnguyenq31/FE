import { Component, OnInit } from '@angular/core';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { ApiResponse } from '../../responses/api.response';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../data-storage.service';
import { ArtistSongService } from '../../services/artist/song.service';
import { ArtistAlbumService } from '../../services/artist/album.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [SidebarsectionComponent,RouterLink,CommonModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent implements OnInit {
  songs: any[] = [];
  isLoading = true;
  albumId: number = 0; // Gán giá trị mặc định
  albumInfo: any; // Biến để lưu thông tin album
  artistName: string = ''; // Tên nghệ sĩ
  albumImage: string = ''; // Hình ảnh album
  artistSongs: any[] = []; // Danh sách bài hát của nghệ sĩ
  selectedSongs: number[] = []; // Danh sách ID bài hát đã chọn
  showModal: boolean = false; // Cờ để hiển thị modal

  constructor(
    private artistAlbumService: ArtistAlbumService,
    private albumService: AlbumService,
    private dataService: DataStorageService,
    private route: ActivatedRoute,
    private artistSongService: ArtistSongService,
  ) {}

  // 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = +params['id'];

      this.albumInfo = this.albumService.getAlbumInfo();
      if (this.albumInfo) {
        this.artistName = this.albumInfo.name;
        this.albumImage = this.albumInfo.cover_image_url;
      } else {
        console.log("không thấy thông tin album");
      }

      this.fetchSongs();
    });
  }

  //lấy tất cả bài hát theo id
  fetchSongs(): void {
    this.albumService.getSongsByAlbumId(this.albumId).subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'OK') {
          this.songs = response.data;
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

  //lấy tất cả bài hát của mình (artist)
  fetchArtistSongs(): void {
    this.artistSongService.getArtistSongs().subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'OK') {
          this.artistSongs = response.data.songs;
        } else {
          console.error('Lỗi khi lấy bài hát của nghệ sĩ:', response.message);
        }
      },
      error: (err) => {
        console.error('Lỗi:', err);
      }
    });
  }

  //phát bài hát được chọn
  playSelectedSong(songUrl: string): void { 
    this.dataService.setSelectedSong(songUrl); 
    this .dataService.setPlaylist(this.songs.map(song => song.secure_url)); 
  }
  
  //phát tất cả bài hát trong album bắt đầu từ bài đầu tiên
  playAlbum(): void {
    if (this.songs.length > 0) {
      this.playSelectedSong(this.songs[0].secure_url);
    }
  }

  //tắt mở khối thêm bài hát
  toggleModal(): void {
    this.showModal = !this.showModal;
    if (this.showModal) {
      this.fetchArtistSongs();
    }
  }

  //danh sách bài hát được chọn để thêm 
  toggleSongSelection(songId: number): void {
    const index = this.selectedSongs.indexOf(songId);
    if (index > -1) {
      this.selectedSongs.splice(index, 1);
    } else {
      this.selectedSongs.push(songId);
    }
  }

  //thêm bái bài hát được chọn vào album
  addSongsToAlbum(): void {
    this.artistAlbumService.addSongsToAlbum(this.albumId, this.selectedSongs).subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'OK') {
          console.log('Thêm bài hát vào album thành công:', response);
          this.toggleModal();
          this.selectedSongs = [];
          this.fetchSongs();
        } else {
          console.error('Lỗi khi thêm bài hát vào album:', response.message);
        }
      },
      error: (err) => {
        console.error('Lỗi:', err);
      }
    });
  }

}