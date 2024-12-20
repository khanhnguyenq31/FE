import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongService } from '../../../services/song.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-manage-song',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './manage-song.component.html',
  styleUrl: './manage-song.component.css',
})
export class ManageSongComponent implements OnInit {
  songs: Array<{ id: number; name: string; secure_url: string; status: string; public_image_id: string }> = [];
  total_pages: number = 0;
  current_page: number = 1;
  items_per_page: number = 0;
  selectedSong: any = null;
  songReports: any = null;

  songs_list_approved: number[] = [];
  songs_list_rejected: number[] = [];

  loadingSongList: boolean = false;
  loadingSongReport: boolean = false;

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.fetchAllSongs();
  }

  fetchAllSongs(): void {
    this.loadingSongList = true;
    this.songService.getAllSong().subscribe({
      next: (response) => {
        this.total_pages = response.data.total_pages;
        this.items_per_page = response.data.items_per_page;
        this.songs = response.data.songs;
        this.loadingSongList = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi tải danh sách nhạc:', error);
        this.loadingSongList = false;
      },
    });
  }

  viewDetails(songId: number): void {
    this.selectedSong = this.songs.find((song) => song.id === songId);
    if (this.selectedSong) {
      this.loadingSongReport = true;
      this.songService.getReportSong(songId).subscribe({
        next: (response) => {
          this.songReports = response.data;
          this.loadingSongReport = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Lỗi khi tải danh sách report:', error);
          this.loadingSongReport = false;
        },
      });
    }
  }

  closeModal(): void {
    this.selectedSong = null;
  }

  onChange(song_id: number, status: string): void {
    if (status === 'approve') {
      this.songs_list_approved.push(song_id);
    } else if (status === 'reject') {
      this.songs_list_rejected.push(song_id);
    }
  }

  submitAllSelections(): void {
    this.loadingSongList = true;
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
        this.loadingSongList = false;
      },
      complete: () => {
        this.loadingSongList = false;
      }
    });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
  }

  nextPage() {
    if (this.current_page < this.total_pages) {
      this.current_page++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.current_page > 1) {
      this.current_page--;
      this.updatePagination();
    }
  }

  updatePagination() {
    const start = (this.current_page - 1) * this.items_per_page;
    const end = start + this.items_per_page;
    // Chưa áp dụng lọc dữ liệu dựa trên trang
  }
}
