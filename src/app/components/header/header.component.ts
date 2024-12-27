import { Component } from '@angular/core';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { ApiResponse } from '../../responses/api.response';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataStorageService } from '../../data-storage.service';
import { PlaylistService } from '../../services/playlist.service';
import { AlbumService } from '../../services/album.service';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../services/role.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProfilemenuComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private searchService: SearchService, 
              private dataService: DataStorageService, 
              private playlistService: PlaylistService, 
              private albumService: AlbumService,
              private roleService: RoleService) {
    this.role = roleService.getRole();
  }
  role: string = '';
  searchTerm = '';
  
  onSearch() {
    this.searchService.setSearchTerm(this.searchTerm);
  }
}
