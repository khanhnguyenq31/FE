import { Component } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { SongService } from '../../services/song.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { DataStorageService } from '../../data-storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homebeforelogin',
  standalone: true,
  imports: [NgIf , NgFor, RouterLink],
  templateUrl: './homebeforelogin.component.html',
  styleUrls: ['./homebeforeloginstyle/homebeforelogin.component.css', 
    './homebeforeloginstyle/footer.css']
})
export class HomebeforeloginComponent {
  hiddenFlag = true;
  iddenFlag = true;
  
  // open the notification
  open() {
    this.hiddenFlag = false;
  }
  
  // close the notification
  close() {
    this.hiddenFlag = true;
  }
  
  role: string = '';
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
}
