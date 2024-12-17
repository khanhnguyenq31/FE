import { Component } from '@angular/core';
import { NgIf , NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../../../services/album.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-manage-album',
  standalone: true,
  imports: [NgIf , FormsModule , NgFor],
  templateUrl: './manage-album.component.html',
  styleUrl: './manage-album.component.css'
})
export class ManageAlbumComponent {
    
  constructor(private albumService : AlbumService) {
    // suppose that admin gets all album
    this.albumService.getAllAbum().subscribe({
      next: (response) => {
        console.log(response)
        this.albums = response.data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi tải danh sách album:', error);
      }
    });
  }

  albums_list_approved: number[] = [];
  albums_list_rejected: number[] = [];

  albums: Array<{ 
    id: number; 
    name: string;
    description: string; 
    cover_image_url: string; 
    release_date: string;
    genre: Array<{id: number, name: string}>;
    status: string ; 
    create_at: string 
  }> = [];

  selectedAlbum: any = null;

  viewDetails(albumId: number) {
    this.selectedAlbum = this.albums.find(album => album.id === albumId);
  }

  closeModal() {
    this.selectedAlbum = null;
  }
  
  onChange(album_id: number , status: string) {
    if (status === 'approve')
      this.albums_list_approved.push(album_id)
    else if (status === 'reject') 
      this.albums_list_rejected.push(album_id)
  }

  submitAllSelections() { 
    if (this.albums_list_approved.length !== 0) { 
      this.albumService.approveAlbum(this.albums_list_approved).subscribe({
        next: (response) => {
          console.log('Approve thành công:', response);  
          this.albumService.getAllAbum().subscribe({
            next: (response) => {
              this.albums = response.data;
            },
            error: (error: HttpErrorResponse) => {
              console.error('Lỗi khi tải danh sách album:', error);
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Lỗi khi approve:', error);
        }
      });
    }

    if (this.albums_list_rejected.length !== 0) { 
      this.albumService.rejectAlbum(this.albums_list_rejected).subscribe({
        next: (response) => {
          console.log('Reject thành công:', response);
          this.albumService.getAllAbum().subscribe({
            next: (response) => {
              this.albums = response.data;
            },
            error: (error: HttpErrorResponse) => {
              console.error('Lỗi khi tải danh sách album:', error);
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Lỗi khi reject:', error);
        }
      });
    }
    this.albums_list_approved.length = 0;
    
    this.albums_list_rejected.length = 0;

  }

}
