import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ArtistSongService } from '../../services/artist/song.service';
import { PlaySongService } from '../../services/play-song.service';
import { UserDetailService } from '../../services/user-detail.service';
import { ApiResponse } from '../../responses/api.response';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
})
export class SongsComponent implements OnInit {
  songs: any[] = []; // Giữ nguyên kiểu any[]
  isLoading = true;
  username: string = '';
  imageUrl: string | null = null;

  constructor(
    private artistSongService: ArtistSongService,
    private dataService: PlaySongService,
    private userDetailService: UserDetailService,
    private tokenSvc: TokenService
  ) {}

  ngOnInit(): void {
    this.loadSongs();
    const token = this.tokenSvc.getToken();
        this.userDetailService.getUserDetails(token).subscribe({
          next: (response: ApiResponse) => {
            if (response.status === 'OK') {
              this.username = response.data.username;
              this.imageUrl = response.data.image_url; // Lưu trữ URL hình ảnh
            }
          },
          error: (error) => {
            console.error('Error fetching user details:', error);
          }
        });
  }

  loadSongs(): void {
    this.isLoading = true;
    this.artistSongService.getArtistSongs().subscribe({
      next: (response) => {
        if (response.status === 'OK') {
          this.songs = response.data.songs; // Giữ nguyên kiểu any[]
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading songs:', err);
        this.isLoading = false;
      },
    });
  }

  playSelectedSong(song: any): void { // Sử dụng any cho tham số
    this.dataService.setSelectedSong(song, this.songs); 
  }

  playListSong(): void {
    if (this.songs.length > 0) {
      this.playSelectedSong(this.songs[0]);
    }
  }
}
