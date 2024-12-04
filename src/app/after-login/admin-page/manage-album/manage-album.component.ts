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
    this.albums = [
        {
          "id": 4,
          "name": "hehe",
          "description": "haha",
          "cover_image_url": "https://example.com/album-cover.jpg",
          "release_date": "2024-12-01",
          "genre": [
              {
                  "id": 1,
                  "name": "nhac tre"
              }
          ],
          "status": "PENDING",
          "create_at": "2024-12-03"
      },
      {
          "id": 6,
          "name": "Album2",
          "description": "This is my first album description.",
          "cover_image_url": "https://example.com/album-cover.jpg",
          "release_date": "2024-12-01",
          "genre": [
              {
                  "id": 2,
                  "name": "nhac hip hop"
              },
              {
                  "id": 3,
                  "name": "nhac soi dong"
              },
              {
                  "id": 4,
                  "name": "nhac ballad"
              }
          ],
          "status": "PENDING",
          "create_at": "2024-12-03"
      }
    ]
  }

  albums_list_approved: number[] = [];
  albums_list_rejected: number[] = [];

  albums: Array<{ id: number,
          name: string,
          description: string,
          cover_image_url: string,
          release_date: "2024-12-01",
          genre: Array<{id: number , name: string}>,
          status: string,
          create_at: string
  }>

  onChange(album_id: number , status: string) {
    if (status = 'APPROVED')
      this.albums_list_approved.push(album_id)
    else if (status = 'REJECTED') this.albums_list_rejected.push(album_id)
  }

  submitAllSelections() { 
    this.albumService.approveAlbum(this.albums_list_approved).subscribe({
      next: (response) => {
        console.log('Approve thành công:', response);  
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi approve:', error);
      }
    });

    this.albumService.rejectalbum(this.albums_list_approved).subscribe({
      next: (response) => {
        console.log('Reject thành công:', response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi reject:', error);
      }
    });
    this.albums_list_approved.length = 0;
    
    this.albums_list_rejected.length = 0;

  }
}
