import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UploadSongService } from '../../../services/upload-song.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [RouterLink, SidebarsectionComponent, FormsModule,CommonModule],
  templateUrl: './new-song.component.html',
  styleUrl: './new-song.component.css'
})
export class NewSongComponent {
  @ViewChild('newSongForm') newSongForm!: NgForm;
  songTitle: string = '';
  songDescription: string = '';
  releaseDate: string = '';
  songFile: File | null = null;
  songData: any = {};
  successMessage: string = '';
  errorMessage: string = ''; 
  constructor(private uploadSongService: UploadSongService) {}

  onSubmit() {
    if (this.songFile) {
      this.uploadSongService.uploadSongToCloudinary(this.songFile).subscribe({
        next: (response) => {
          console.log('Upload thành công:', response);
          this.songData = {
            name: this.songTitle,
            description: this.songDescription,
            release_date: this.releaseDate,
            secure_url: response.data.secure_url,
            public_id: response.data.public_id,
            duration: response.data.duration,
            cloudinary_version: response.data.cloudinary_version 
          };

          this.uploadSongService.saveSongToDb(this.songData).subscribe({
            next: (dbResponse) => {
              console.log('Lưu thông tin bài hát thành công:', dbResponse);              
              this.successMessage = 'Tạo bài hát thành công!';

              this.newSongForm.resetForm();
              this.songFile = null;
              setTimeout(() => {
              this.successMessage = '';
              }, 3000);
            },
            error: (dbError: HttpErrorResponse) => {
              console.error('Lỗi khi lưu thông tin bài hát:', dbError);
              this.errorMessage = 'Lỗi khi lưu thông tin bài hát. Vui lòng thử lại!';
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Lỗi khi upload:', error);
          this.errorMessage = 'Lỗi khi upload bài hát. Vui lòng kiểm tra kết nối mạng hoặc thử lại!';
        }
      });
    } else {
      console.error('Vui lòng chọn file bài hát.');
      this.errorMessage = 'Vui lòng chọn file bài hát!';
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) { 
      this.songFile = file; // Lưu file vào biến songFile
    }
  }

}
