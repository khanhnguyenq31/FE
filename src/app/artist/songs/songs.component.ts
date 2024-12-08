import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { ArtistSongService } from '../../services/artist/song.service';
import { DataStorageService } from '../../data-storage.service';
@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [RouterLink, SidebarsectionComponent, ProfilemenuComponent,CommonModule, FormsModule],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css',
})
export class SongsComponent implements OnInit {
  songs: any[] = [];
  isLoading = true;

  constructor(
    private artistSongService: ArtistSongService,
    private dataService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.artistSongService.getArtistSongs().subscribe({
      next: (response) => {
        if (response.status === 'OK') {
          this.songs = response.data.songs;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading songs:', err);
        this.isLoading = false;
      },
    });
  }
  // playSelectedSong(songUrl: string) {
  // this.dataService.setSelectedSong(songUrl);
  // this.dataService.setPlaylist(this.songs.map(song => song.secure_url));
  // }

}
