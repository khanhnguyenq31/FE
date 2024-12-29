import { Component } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaySongService } from '../../services/play-song.service';

@Component({
  selector: 'app-mange-playlist',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './mange-playlist.component.html',
  styleUrl: './mange-playlist.component.css'
})
export class ManagePlaylistComponent {
  playlists: Array<{id: number; 
                    name: string; 
                    cover_url: string; 
                    is_public: boolean;
                    user: string;
                    status: string }> = [];

  playlists_list_approved: number[] = [];
  playlists_list_rejected: number[] = [];
  selectedPlaylist: any = null;
  loadingList: boolean = false;
  loadingSongList: boolean = false;
  songs: any = null;
  constructor(private playlistService: PlaylistService,
              private dataStorage: PlaySongService
  ) {}
  
  ngOnInit(): void {
    this.fetchAllPlaylists();
  }

  fetchAllPlaylists(): void {
    this.loadingList = true;
    this.playlistService.getAllPlaylistsByAdmin().subscribe({
      next: (response) => {
        this.playlists = response.data;
        console.log(this.playlists)
        this.loadingList = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi tải danh sách nhạc:', error);
        this.loadingList = false;
      },
    });
  }

  onChange(playlist_id: number, event: Event): void {
    const status = event.target as HTMLSelectElement;
    console.log(status.value)
    if (status.value === 'APPROVED') {
      this.playlists_list_approved.push(playlist_id);
    } else if (status.value === 'REJECTED') {
      this.playlists_list_rejected.push(playlist_id);
    }
  }
  
  closeModal(): void {
    this.selectedPlaylist = null;
  }

  viewDetails(playlistId: number, play: boolean = false): void {
    this.selectedPlaylist = this.playlists.find((Playlist) => Playlist.id === playlistId);
    this.loadingSongList = true;
    this.playlistService.getPlaylistById(playlistId).subscribe({
      next: (response: any) => {
        if (response.status === 'OK') {
          this.songs = response.data.songs;
          this.loadingSongList = false;
        } else {
          this.loadingSongList = false;
          console.error('Error fetching playlist:', response.message);
        }
      },
      error: (error) => {
        this.loadingSongList = false;
        console.error('Error fetching playlist:', error);
      }
    });
  }

  playPlaylist() {
    this.dataStorage.setSelectedSong(this.songs[0], this.songs); 
  }

  submitAllSelections(): void {
    this.loadingList = true;
    const requests: Observable<any>[] = [];

    if (this.playlists_list_approved.length > 0) {
      requests.push(this.playlistService.approvePlaylist(this.playlists_list_approved));
    }
    if (this.playlists_list_rejected.length > 0) {
      requests.push(this.playlistService.rejectPlaylist(this.playlists_list_rejected));
    }

    forkJoin(requests).subscribe({
      next: () => {
        console.log('Cập nhật trạng thái thành công');
        this.fetchAllPlaylists();
        this.playlists_list_approved = [];
        this.playlists_list_rejected = [];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi cập nhật trạng thái:', error);
        this.loadingList = false;
      },
      complete: () => {
        this.loadingList = false;
      }
    });
  }
}
