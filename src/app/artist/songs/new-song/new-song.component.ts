import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UploadSongService } from '../../../services/artist/upload-song.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [RouterLink, SidebarsectionComponent, FormsModule, CommonModule],
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

  constructor(private uploadSongService: UploadSongService) {}

  onSubmit() {
    if (this.songFile) {
      // Bước 1: Upload bài hát lên Cloudinary
      this.uploadSongService.uploadSongToCloudinary(this.songFile).subscribe({
        next: (response) => {
          console.log('Upload bài hát thành công:', response);

          this.songData = {
            name: this.songTitle,
            description: this.songDescription,
            release_date: this.releaseDate,
            secure_url: response.data.secure_url,
            public_id: response.data.public_id,
            duration: response.data.duration,
            cloudinary_version: response.data.cloudinary_version
          };

          // Bước 2: Lưu thông tin bài hát vào cơ sở dữ liệu
          this.uploadSongService.saveSongToDb(this.songData).subscribe({
            next: (dbResponse) => {
              console.log('Lưu bài hát thành công:', dbResponse);

              if (this.songImage) {
                // Bước 3: Upload hình ảnh bài hát nếu có
                this.uploadSongService
                  .uploadSongImage(dbResponse.data.id, this.songImage)
                  .subscribe({
                    next: (imageResponse) => {
                      console.log('Upload hình ảnh thành công:', imageResponse);
                      this.successMessage = 'Tạo bài hát và tải ảnh thành công!';
                    },
                    error: (imageError: HttpErrorResponse) => {
                      console.error('Lỗi khi tải hình ảnh:', imageError);
                      this.errorMessage =
                        'Bài hát đã được tạo, nhưng lỗi khi tải ảnh.';
                    }
                  });
              } else {
                this.successMessage = 'Tạo bài hát thành công!';
              }

              this.newSongForm.resetForm();
              this.songFile = null;
              this.songImage = null;

              setTimeout(() => {
                this.successMessage = '';
              }, 3000);
            },
            error: (dbError: HttpErrorResponse) => {
              console.error('Lỗi khi lưu bài hát:', dbError);
              this.errorMessage =
                'Lỗi khi lưu thông tin bài hát. Vui lòng thử lại!';
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Lỗi khi upload bài hát:', error);
          this.errorMessage =
            'Lỗi khi upload bài hát. Vui lòng kiểm tra kết nối mạng hoặc thử lại!';
        }
      });
    } else {
      console.error('Vui lòng chọn file bài hát.');
      this.errorMessage = 'Vui lòng chọn file bài hát!';
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
