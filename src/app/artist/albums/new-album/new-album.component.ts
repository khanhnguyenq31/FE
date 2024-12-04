import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UploadAlbumService } from '../../../services/upload-album.service';
import { ApiResponse } from '../../../responses/api.response';
@Component({
  selector: 'app-new-album',
  standalone: true,
  imports: [RouterLink, SidebarsectionComponent,FormsModule ,CommonModule],
  templateUrl: './new-album.component.html',
  styleUrl: './new-album.component.css'
})
export class NewAlbumComponent {
 @ViewChild('newAlbumForm') newAlbumForm!: NgForm;
  albumTitle: string = '';
  albumDescription: string = '';
  albumReleaseDate: string = '';
  albumImage: File | null = null;
  genreIds: string = ''; // Chuỗi chứa danh sách ID thể loại
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private uploadAlbumService: UploadAlbumService) {}

  onSubmit() {
    const genreIdArray = this.genreIds.split(',').map((id) => parseInt(id.trim(), 10));
    const albumData = {
      name: this.albumTitle,
      description: this.albumDescription,
      release_date: this.albumReleaseDate,
      genre_id: genreIdArray
    };

    this.uploadAlbumService.createAlbum(albumData).subscribe({
      next: (response: ApiResponse) => {
        const albumId = response.data?.id;
        if (!albumId) {
          console.error('Không thể lấy ID album từ phản hồi API.');
          this.errorMessage = 'Lỗi: Không thể tạo album.';
          return;
        }

        // Upload ảnh bìa album
        if (this.albumImage) {
          this.uploadAlbumService.uploadAlbumImage(albumId, this.albumImage).subscribe({
            next: (imageResponse) => {
              console.log('Tải ảnh bìa album thành công:', imageResponse);
              this.successMessage = 'Tạo album thành công!';
              this.resetForm();
            },
            error: (imageError: HttpErrorResponse) => {
              console.error('Lỗi khi tải ảnh bìa:', imageError);
              this.errorMessage = 'Lỗi khi tải ảnh bìa album.';
            }
          });
        } else {
          this.successMessage = 'Tạo album thành công!';
          this.resetForm();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Lỗi khi tạo album:', error);
        this.errorMessage = 'Lỗi khi tạo album. Vui lòng thử lại!';
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.albumImage = file; // Lưu file ảnh bìa
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