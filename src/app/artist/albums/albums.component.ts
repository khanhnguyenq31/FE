import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { ApiResponse } from '../../responses/api.response';
import { CommonModule } from '@angular/common';
import { PlaySongService } from '../../services/play-song.service';
import { ArtistSongService } from '../../services/artist/song.service';
import { ArtistAlbumService } from '../../services/artist/album.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
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

  searchTermForAdd: string = ''; // Biến để lưu từ khóa tìm kiếm cho modal thêm bài hát
  filteredSongsForAdd: any[] = []; // Danh sách bài hát đã lọc cho modal thêm bài hát

  searchTermForEdit: string = ''; // Biến để lưu từ khóa tìm kiếm cho modal chỉnh sửa album
  filteredSongsForEdit: any[] = []; // Danh sách bài hát đã lọc cho modal chỉnh sửa album

  constructor(
    private artistAlbumService: ArtistAlbumService,
    private albumService: AlbumService,
    private dataService: PlaySongService,
    private route: ActivatedRoute,
    private artistSongService: ArtistSongService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.albumId = +params['id'];
      this.fetchSongs();
    });
  }

  fetchSongs(): void {
  this.isLoading = true; 
  this.albumService.getSongsByAlbumId(this.albumId).subscribe({
    next: (response: ApiResponse) => {
      if (response.status === 'OK') {
        console.log(response);
        this.songs = response.data.songs;
        this.artistName = response.data.name;
        this.albumImage = response.data.cover_image_url;
        this.albumName = response.data.name;
        this.albumDescription = response.data.description;
        this.filteredSongsForEdit = this.songs; // Khởi tạo danh sách bài hát đã lọc cho modal chỉnh sửa ```typescript
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
        this.filteredSongsForAdd = this.artistSongs; // Khởi tạo danh sách bài hát đã lọc cho modal thêm bài hát
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
    this.dataService.setSelectedSong(song, this.songs);
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

 

  toggleOptionsModal(): void {
    this.showOptionsModal = !this.showOptionsModal;
  }

  toggleSongSelection(songId: number): void {
    const index = this.selectedSongs.indexOf(songId);
    if (index > -1) {
      this.selectedSongs.splice(index, 1); // Xóa bài hát khỏi danh sách đã chọn
    } else {
      this.selectedSongs.push(songId); // Thêm bài hát vào danh sách đã chọn
    }
  }

  toggleDeleteSong(songId: number): void {
    const index = this.listDelete.indexOf(songId);
    if (index > -1) {
      this.listDelete.splice(index, 1); // Xóa bài hát khỏi danh sách xóa
    } else {
      this.listDelete.push(songId); // Thêm bài hát vào danh sách xóa
    }
  }

  addSongsToAlbum(): void {
    this.isLoading = true; 
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
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Lỗi:', err);
        this.isLoading = false; 
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

  filterSongsForAdd(): void {
  if (this.searchTermForAdd) {
    this.filteredSongsForAdd = this.artistSongs.filter(song => 
      song.name.toLowerCase().includes(this.searchTermForAdd.toLowerCase())
    );
  } else {
    this.filteredSongsForAdd = this.artistSongs;
  }
}

filterSongsForEdit(): void {
  if (this.searchTermForEdit) {
    this.filteredSongsForEdit = this.songs.filter(song => 
      song.name.toLowerCase().includes(this.searchTermForEdit.toLowerCase())
    );
  } else {
    this.filteredSongsForEdit = this.songs;
  }
}
}