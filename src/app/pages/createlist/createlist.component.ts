import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PlaylistService } from '../../services/playlist.service'; 
import { ApiResponse } from '../../responses/api.response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createlist.component.html',
  styleUrls: ['./createlist.component.css']
})
export class CreatelistComponent {
  @ViewChild('newPlaylistForm') newPlaylistForm!: NgForm;
  playlistName: string = '';
  playlistDescription: string = '';
  playlistStatus: string = 'public'; // Default to public
  playlistImage: File | null = null; // Variable to store the image
  successMessage: string = '';
  errorMessage: string = '';
  isLoading = false;

  constructor(private playlistService: PlaylistService) {}

  // Method to handle form submission
  onSubmit() {
    this.isLoading = true;
    // Validate form
    if (this.newPlaylistForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return; // Do not proceed if the form is invalid
    }
    
    const playlistData = {
      name: this.playlistName,
      description: this.playlistDescription,
      is_public: this.playlistStatus === 'public' // Convert status to boolean
    };
    // Call service to create a new playlist
    this.playlistService.createPlaylist(playlistData).subscribe({
      next: (response: ApiResponse) => {
        const playlistId = response.data?.id;
        if (!playlistId) {
          this.isLoading = false;
          console.error('Failed to retrieve playlist ID from API response.');
          this.errorMessage = 'Error: Unable to create playlist.';
          return;
        }

        // Upload playlist cover image
        if (this.playlistImage) {
          this.playlistService.uploadPlaylistImage(playlistId, this.playlistImage).subscribe({
            next: (imageResponse) => {
              this.isLoading = false;
              console.log('Successfully uploaded playlist cover image:', imageResponse);
              this.successMessage = 'Playlist created successfully!';
              this.resetForm();
            },
            error: (imageError: HttpErrorResponse) => { 
              this.isLoading = false;                      
              console.error('Error uploading playlist cover image:', imageError);
              this.errorMessage = 'Error uploading playlist cover image.';
            }
          });
        } else {
          this.isLoading = false;
          this.successMessage = 'Playlist created successfully!';
          this.resetForm();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Error creating playlist:', error);
        this.errorMessage = 'Error creating playlist. Please try again!';
      }
    });
  }

  // Method to handle file selection
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.playlistImage = file; // Store the selected cover image
    }
  }

  resetForm() {
    this.newPlaylistForm.resetForm();
    this.playlistName = '';
    this.playlistDescription = '';
    this.playlistImage = null;
    this.playlistStatus = 'public';
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
