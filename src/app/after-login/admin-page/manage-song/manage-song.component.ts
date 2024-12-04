import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SongService } from '../../../services/song.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-song',
  standalone: true,
  imports: [ FormsModule , NgFor],
  templateUrl: './manage-song.component.html',
  styleUrl: './manage-song.component.css'
})
export class ManageSongComponent {
  
  constructor(private songService : SongService) {
    // suppose that admin gets all song
    this.songService.getAllSong().subscribe({
      next: (response) => {
        this.songs = response.data.songs
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi tải danh sách nhạc:', error);
      }
    });
  }

  songs_list_approved: number[] = [];
  songs_list_rejected: number[] = [];

  songs: Array<{ id: number; name: string; secure_url: string; status: string }> = [];

  onChange(song_id: number , status: string) {
    if (status = 'APPROVED')
      this.songs_list_approved.push(song_id)
    else if (status = 'REJECTED') this.songs_list_rejected.push(song_id)
  }

  submitAllSelections() { 
    this.songService.approveSong(this.songs_list_approved).subscribe({
      next: (response) => {
        console.log('Approve thành công:', response);  
        this.songService.getAllSong().subscribe({
          next: (response) => {
            this.songs = [...response.data.songs];
          },
          error: (error: HttpErrorResponse) => {
            console.error('Lỗi khi tải danh sách nhạc:', error);
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi approve:', error);
      }
    });

    this.songService.rejectSong(this.songs_list_approved).subscribe({
      next: (response) => {
        console.log('Reject thành công:', response);
        this.songService.getAllSong().subscribe({
          next: (response) => {
            this.songs = [...response.data.songs];
          },
          error: (error: HttpErrorResponse) => {
            console.error('Lỗi khi tải danh sách nhạc:', error);
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi reject:', error);
      }
    });
    this.songs_list_approved.length = 0;
    
    this.songs_list_rejected.length = 0;

  }
}
