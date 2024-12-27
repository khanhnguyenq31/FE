import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../services/playlist.service';
import { ApiResponse } from '../../responses/api.response';
import { DataStorageService } from '../../data-storage.service';
import { SongService } from '../../services/song.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
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
  showEditModal: boolean = false;
  showOptionsModal: boolean = false;
  playlistName: string = '';
  playlistDescription: string = '';
  listDelete: number[] = [];
  listAdd: number[] = [];
  is_public : boolean = false;
  constructor(
      private playlistService: PlaylistService,
      private songService: SongService,
      private dataService: DataStorageService,
      private route: ActivatedRoute,
      private roleService: RoleService,
  ) {}
  
  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.playlistId = +params['id'];
  
  
        this.fetchSongs();
      });
      this.role = this.roleService.getRole();
  }
  
  fetchSongs(): void {
    this.isLoading=true;
    this.playlistService.getPlaylistById(this.playlistId).subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'OK') {
          this.songs = response.data.songs;
          this.playlistImage = response.data.cover_url;
          this.playlistName = response.data.name;
          this.playlistDescription = response.data.description;
          this.is_public = response.data.is_public;
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
    this.songService.getAllSong4Listener().subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'OK') {
          this.allSongs = response.data.songs;
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

  toggleModal(): void {
    this.showModal = !this.showModal;
    if (this.showModal) {
      this.fetchAllSongs();
    }
  }

  toggleEditModal(): void {
    this.showEditModal = !this.showEditModal;
    if (this.showEditModal) {
      this.playlistName = this.playlistInfo.name;
      this.playlistDescription = this.playlistInfo.description;
      this.is_public = this.playlistInfo.is_public;
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
  

  addSongsToPlaylist(): void {
    const updatedPlaylist = {
        name: this.playlistName, 
        description: this.playlistDescription,
        is_public: this.is_public,
        list_delete: this.listDelete.length > 0 ? this.listDelete : [],
        list_add: this.selectedSongs
    };
    this.isLoading=true;
    this.playlistService.updatePlaylist(this.playlistId, updatedPlaylist).subscribe({
        next: (response: ApiResponse) => {
            if (response.status === 'OK') {
                console.log('Thêm bài hát vào playlist thành công:', response);
                this.toggleModal();
                this.selectedSongs = [];
                this.fetchSongs(); 
            } else {
                console.error('Lỗi khi thêm bài hát vào playlist:', response.message);
            }
            this.isLoading = false;
        },
        error: (err) => {
            console.error('Lỗi:', err);
            this.isLoading = false;
        }
    });
}
  

  updatePlaylist(): void {
    const updatedPlaylist = {
        name: this.playlistName,
        description: this.playlistDescription,
        is_public: this.is_public,
        list_delete: this.listDelete.length > 0 ? this.listDelete : [],
        list_add: []
    };

    this.playlistService.updatePlaylist(this.playlistId, updatedPlaylist).subscribe({
        next: (response: ApiResponse) => {
            if (response.status === 'OK') {
                console.log('Cập nhật playlist thành công:', response);
                this.toggleEditModal();
                this.fetchSongs();
            } else {
                console.error('Lỗi khi cập nhật playlist:', response.message);
            }
        },
        error: (err) => {
            console.error('Lỗi:', err);
        }
    });
  }

}
