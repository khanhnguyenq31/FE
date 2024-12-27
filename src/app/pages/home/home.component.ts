import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { RouterLink } from '@angular/router';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { RoleService } from '../../services/role.service';
import { SongService } from '../../services/song.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../data-storage.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  role: string = '';
  hiddenFlag = true;
  iddenFlag = true;
  loadingSongList = false;
  songs: Array<Array<{ id: number; name: string; secure_url: string; status: string; public_image_id: string; artist_name: string }>> = [];
  rows: number = 3;
  songPerRow: number = 6;


  constructor(private roleService: RoleService, 
    private songService: SongService, 
    private dataStorage: DataStorageService) {
      this.role = roleService.getRole();
    }

  ngOnInit(): void {
    this.fetchAllSongs();
  }

  fetchAllSongs(): void {
      this.loadingSongList = true;
      const current_rows = 1;
      for (let row = 1 ; row <= this.rows; row++)
        this.songService.getAllSong4Listener(row , this.songPerRow).subscribe({
          next: (response) => {
            this.songs.push(response.data.songs);
            this.loadingSongList = false;
          },
          error: (error: HttpErrorResponse) => {
            console.error('Lỗi khi tải danh sách nhạc:', error);
            this.loadingSongList = false;
          },
        });
  }

  playSong(song: any) {
    this.dataStorage.setSelectedSong(song); 
    this.dataStorage.setPlaylist(this.songs);
  }
}
