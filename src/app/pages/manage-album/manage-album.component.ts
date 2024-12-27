import { Component } from '@angular/core';
import { NgIf , NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-manage-album',
  standalone: true,
  imports: [NgIf , FormsModule , NgFor],
  templateUrl: './manage-album.component.html',
  styleUrl: './manage-album.component.css'
})
export class ManageAlbumComponent {
  total_pages: number = 0;
  current_page: number = 1;
  items_per_page: number = 0;
  selectedAlbum: any = null;
  albums: Array<{ 
    id: number; 
    name: string;
    description: string; 
    cover_image_url: string; 
    release_date: string;
    status: string ; 
    create_at: string 
    artist: {username: string, image_url: string}
    songs: Array<{songname: string, secure_url: string, public_image_id: string}>
  }> = [];

  Albums_list_approved: number[] = [];
  Albums_list_rejected: number[] = [];

  loadingList: boolean = false;

  constructor(private AlbumService: AlbumService, private dataStorage: DataStorageService) {}

  ngOnInit(): void {
    this.fetchAllAlbums();
  }
  
  fetchAllAlbums(): void {
    this.loadingList = true;
    this.AlbumService.getAllAlbum(this.current_page).subscribe({
      next: (response) => {
        this.albums = response.data;
        this.loadingList = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi tải danh sách album:', error);
        this.loadingList = false;
      },
    });
  }
  
  viewDetails(AlbumId: number): void {
    this.selectedAlbum = this.albums.find((Album) => Album.id === AlbumId);
    console.log(AlbumId, this.selectedAlbum)
    if (this.selectedAlbum) {
    }
  }
  
  closeModal(): void {
    this.selectedAlbum = null;
  }
  
  onChange(album_id: number, event: Event): void {
    const status = event.target as HTMLSelectElement;
    console.log(status.value)
    if (status.value === 'APPROVED') {
      this.Albums_list_approved.push(album_id);
    } else if (status.value === 'REJECTED') {
      this.Albums_list_rejected.push(album_id);
    }
  }

  playAlbum(Album: any) {
    this.dataStorage.setSelectedSong(Album.songs[0]); 
    this.dataStorage.setPlaylist(Album.songs);
  }

  submitAllSelections(): void {
    this.loadingList = true;
    const requests: Observable<any>[] = [];

    if (this.Albums_list_approved.length > 0) {
      requests.push(this.AlbumService.approveAlbum(this.Albums_list_approved));
    }
    if (this.Albums_list_rejected.length > 0) {
      requests.push(this.AlbumService.rejectAlbum(this.Albums_list_rejected));
    }

    forkJoin(requests).subscribe({
      next: () => {
        console.log('Cập nhật trạng thái thành công');
        this.fetchAllAlbums();
        this.Albums_list_approved = [];
        this.Albums_list_rejected = [];
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
}
