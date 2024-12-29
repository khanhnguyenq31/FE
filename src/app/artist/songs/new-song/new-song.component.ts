import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UploadSongService } from '../../../services/artist/upload-song.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [ SidebarsectionComponent, FormsModule, CommonModule],
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.css']
})
export class NewSongComponent {
  @ViewChild('newSongForm') newSongForm!: NgForm;
  songTitle: string = '';
  songDescription: string = '';
  releaseDate: string = '';
  songFile: File | null = null;
  songImage: File | null = null;
  songData: any = {};
  successMessage: string = '';
  errorMessage: string = '';
  isLoading = false;

  constructor(private uploadSongService: UploadSongService) {}

  onSubmit() {
    this.isLoading = true;
    if (this.songFile) {
      // Step 1: Upload song to Cloudinary
      this.uploadSongService.uploadSongToCloudinary(this.songFile).subscribe({
        next: (response) => {
          console.log('Song upload successful:', response);

          this.songData = {
            name: this.songTitle,
            description: this.songDescription,
            release_date: this.releaseDate,
            secure_url: response.data.secure_url,
            public_id: response.data.public_id,
            duration: response.data.duration,
            cloudinary_version: response.data.cloudinary_version
          };

          // Step 2: Save song information to the database
          this.uploadSongService.saveSongToDb(this.songData).subscribe({
            next: (dbResponse) => {
              console.log('Song saved successfully:', dbResponse);

              if (this.songImage) {
                // Step 3: Upload song image if present
                this.uploadSongService
                  .uploadSongImage(dbResponse.data.id, this.songImage)
                  .subscribe({
                    next: (imageResponse) => {
                      console.log('Image upload successful:', imageResponse);
                      this.successMessage = 'Song and image created successfully!';
                    },
                    error: (imageError: HttpErrorResponse) => {
                      console.error('Error uploading image:', imageError);
                      this.errorMessage = 'Song created, but error uploading image.';
                    }
                  });
              } else {
                this.successMessage = 'Song created successfully!';
              }
              this.songFile = null;
              this.songImage = null;

              setTimeout(() => {
                this.isLoading = false;
                this.successMessage = '';
              }, 3000);
              
            },
            error: (dbError: HttpErrorResponse) => {
              this.isLoading = false;
              console.error('Error saving song:', dbError);
              this.errorMessage = 'Error saving song information. Please try again!';
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('Error uploading song:', error);
          this.errorMessage = 'Error uploading song. Please check your network connection or try again!';
        }
      });
    } else {
      this.isLoading = false;
      console.error('Please select a song file.');
      this.errorMessage = 'Please select a song file!';
    }
  }

  onFileChange(event: any, type: 'song' | 'image') {
    const file = event.target.files[0];
    if (file) {
      if (type === 'song') {
        this.songFile = file;
      } else if (type === 'image') {
        this.songImage = file;
      }
    }
  }
}
