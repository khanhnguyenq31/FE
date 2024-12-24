import { Component, OnInit } from '@angular/core';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { ApiResponse } from '../../responses/api.response';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../data-storage.service';
import { ArtistSongService } from '../../services/artist/song.service';
import { ArtistAlbumService } from '../../services/artist/album.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [SidebarsectionComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  songs: any[] = [];
  isLoading = true;
  albumId: number = 0;
  albumInfo: any;
  artistName: string = '';
  albumImage: string = '';
  artistSongs: any[] = [];
  selectedSongs: number[] = [];
  showModal: boolean = false;
  showEditModal: boolean = false;
  showOptionsModal: boolean = false;
  albumName: string = '';
  albumDescription: string = '';
  listDelete: number[] = [];
  listAdd: number[] = [];

  constructor(
    private artistAlbumService: ArtistAlbumService,
    private albumService: AlbumService,
    private dataService: DataStorageService,
    private route: ActivatedRoute,
    private artistSongService: ArtistSongService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = +params['id'];
      this.albumInfo = this.albumService.getAlbumInfo();
      if (this.albumInfo) {
        this.artistName = this.albumInfo.name;
        this.albumImage = this.albumInfo.cover_image_url;
        this.albumName = this.albumInfo.name;
        this.albumDescription = this.albumInfo.description;
      } else {
        console.log("Không thấy thông tin album");
      }
      this.fetchSongs();
    });
  }

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

  playSelectedSong(song: any): void {
    this.dataService.setSelectedSong(song);
    this.dataService.setPlaylist(this.songs);
  }

  playAlbum(): void {
    if (this.songs.length > 0) {
      this.playSelectedSong(this.songs[0]);
    }
  }

  toggleModal(): void {
    this.showModal = ! this.showModal;
    if (this.showModal) {
      this.fetchArtistSongs();
    }
  }

  toggleEditModal(): void {
    this.showEditModal = !this.showEditModal;
    if (this.showEditModal) {
      this.albumName = this.albumInfo.name;
      this.albumDescription = this.albumInfo.description;
      this.listDelete = [];
      this.fetchSongs(); // Gọi hàm fetchSongs để lấy danh sách bài hát
    }
  }

  toggleDeleteSong(songId: number): void {
    const index = this.listDelete.indexOf(songId);
    if (index > -1) {
      this.listDelete.splice(index, 1);
    } else {
      this.listDelete.push(songId);
    }
  }

  toggleOptionsModal(): void {
    this.showOptionsModal = !this.showOptionsModal;
  }

  toggleSongSelection(songId: number): void {
    const index = this.selectedSongs.indexOf(songId);
    if (index > -1) {
      this.selectedSongs.splice(index, 1);
    } else {
      this.selectedSongs.push(songId);
    }
  }

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

  updateAlbum(): void {
    const updatedAlbum = {
        name: this.albumName,
        description: this.albumDescription,
        list_delete: this.listDelete.length > 0 ? this.listDelete : [],
        list_add: []
    };

    this.artistAlbumService.updateAlbum(this.albumId, updatedAlbum).subscribe({
        next: (response: ApiResponse) => {
            if (response.status === 'OK') {
                console.log('Cập nhật album thành công:', response);
                this.toggleEditModal();
                this.fetchSongs();
            } else {
                console.error('Lỗi khi cập nhật album:', response.message);
            }
        },
        error: (err) => {
            console.error('Lỗi:', err);
        }
    });
}
}