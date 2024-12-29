import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UploadAlbumService } from '../../../services/artist/upload-album.service'; 
import { ApiResponse } from '../../../responses/api.response';

@Component({
  selector: 'app-new-album',
  standalone: true,
  imports: [ SidebarsectionComponent, FormsModule, CommonModule],
  templateUrl: './new-album.component.html',
  styleUrl: './new-album.component.css'
})
export class NewAlbumComponent {
  @ViewChild('newAlbumForm') newAlbumForm!: NgForm;
  albumTitle: string = '';
  albumDescription: string = '';
  albumReleaseDate: string = '';
  albumImage: File | null = null;
  genreIds: string = ''; // String containing genre IDs
  successMessage: string = '';
  errorMessage: string = '';
  isLoading = false;

  constructor(private uploadAlbumService: UploadAlbumService) {}

  onSubmit() {
    const genreIdArray = this.genreIds.split(',').map((id) => parseInt(id.trim(), 10));
    const albumData = {
      name: this.albumTitle,
      description: this.albumDescription,
      release_date: this.albumReleaseDate,
      genre_id: genreIdArray
    };
    this.isLoading = true;

    this.uploadAlbumService.createAlbum(albumData).subscribe({
      next: (response: ApiResponse) => {
        const albumId = response.data?.id;
        if (!albumId) {
          this.isLoading = false;
          console.error('Unable to retrieve album ID from API response.');
          this.errorMessage = 'Failed to create album!';
          return;
        }

        // Upload album cover image
        if (this.albumImage) {
          this.uploadAlbumService.uploadAlbumImage(albumId, this.albumImage).subscribe({
            next: (imageResponse) => {
              this.isLoading = false;
              console.log('Album cover image uploaded successfully:', imageResponse);
              this.successMessage = 'Succeeded in creating album';
              this.resetForm();
            },
            error: (imageError: HttpErrorResponse) => {
              this.isLoading = false;
              console.error('Error uploading album cover image:', imageError);
              this.errorMessage = "Failed to upload album's picture";
            }
          });
        } else {
          this.isLoading = false;
          this.successMessage = 'Succeeded in creating album';
          this.resetForm();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Error creating album:', error);
        this.errorMessage = `Failed to create album due to "${error.error.message}". Please try again!`;
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.albumImage = file; // Save album cover image file
    }
  }

  resetForm() {
    this.newAlbumForm.resetForm();
    this.albumTitle = '';
    this.albumDescription = '';
    this.albumReleaseDate = '';
    this.albumImage = null;
    this.genreIds = '';
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
