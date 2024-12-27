import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongService } from '../../services/song.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-manage-song',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './manage-song.component.html',
  styleUrl: './manage-song.component.css',
})
export class ManageSongComponent implements OnInit {
  songs: Array<{id: number; 
                name: string; 
                secure_url: string; 
                status: string; 
                public_image_id: string }> = [];
                
  total_pages: number = 0;
  current_page: number = 1;
  items_per_page: number = 0;
  selectedSong: any = null;
  songReports: any = null;

  songs_list_approved: number[] = [];
  songs_list_rejected: number[] = [];

  loadingList: boolean = false;

  constructor(private songService: SongService, private dataStorage: DataStorageService) {}

  ngOnInit(): void {
    this.fetchAllSongs();
  }

  fetchAllSongs(): void {
    this.loadingList = true;
    this.songService.getAllSong4Admin(this.current_page).subscribe({
      next: (response) => {
        this.total_pages = response.data.total_pages;
        this.songs = response.data.songs;
        this.loadingList = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi tải danh sách nhạc:', error);
        this.loadingList = false;
      },
    });
  }

  onChange(song_id: number, event: Event): void {
    const status = event.target as HTMLSelectElement;
    console.log(status.value)
    if (status.value === 'APPROVED') {
      this.songs_list_approved.push(song_id);
    } else if (status.value === 'REJECTED') {
      this.songs_list_rejected.push(song_id);
    }
  }

  playSong(song: any) {
    const playedPlaylist = []
    playedPlaylist.push(song)
    this.dataStorage.setSelectedSong(song); 
    this.dataStorage.setPlaylist(playedPlaylist);
  }

  submitAllSelections(): void {
    this.loadingList = true;
    const requests: Observable<any>[] = [];

    if (this.songs_list_approved.length > 0) {
      requests.push(this.songService.approveSong(this.songs_list_approved));
    }
    if (this.songs_list_rejected.length > 0) {
      requests.push(this.songService.rejectSong(this.songs_list_rejected));
    }

    forkJoin(requests).subscribe({
      next: () => {
        console.log('Cập nhật trạng thái thành công');
        this.fetchAllSongs();
        this.songs_list_approved = [];
        this.songs_list_rejected = [];
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

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
  }

  nextPage() {
    if (this.current_page < this.total_pages) {
      this.current_page++;
      this.fetchAllSongs()
    }
  }

  prevPage() {
    if (this.current_page > 1) {
      this.current_page--;
      this.fetchAllSongs()
    }
  }
}
