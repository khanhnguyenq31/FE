import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PlaylistService } from '../../services/playlist.service'; 
import { ApiResponse } from '../../responses/api.response';
import { SidebarsectionComponent } from "../../components/sidebarsection/sidebarsection.component";
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createlist',
  standalone: true,
  imports: [SidebarsectionComponent, ProfilemenuComponent, CommonModule, FormsModule],
  templateUrl: './createlist.component.html',
  styleUrls: ['./createlist.component.css']
})
export class CreatelistComponent {
  @ViewChild('newPlaylistForm') newPlaylistForm!: NgForm;
  playlistName: string = '';
  playlistDescription: string = '';
  playlistStatus: string = 'public'; // Mặc định là công khai
  playlistImage: File | null = null; // Biến để lưu trữ hình ảnh
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private playlistService: PlaylistService) {}

  // Phương thức để xử lý khi người dùng gửi form
  onSubmit() {
  // Kiểm tra tính hợp lệ của form
  if (this.newPlaylistForm.invalid) {
    this.errorMessage = 'Vui lòng điền đầy đủ thông tin.';
    return; // Không gửi yêu cầu nếu form không hợp lệ
  }

  const playlistData = {
    name: this.playlistName,
    description: this.playlistDescription,
    is_public: this.playlistStatus === 'public' // Chuyển đổi trạng thái thành boolean
  };

  // Gọi service để tạo playlist mới
  this.playlistService.createPlaylist(playlistData).subscribe({
    next: (response: ApiResponse) => {
      const playlistId = response.data?.id;
      if (!playlistId) {
        console.error('Không thể lấy ID playlist từ phản hồi API.');
        this.errorMessage = 'Lỗi: Không thể tạo playlist.';
        return;
      }

      // Upload ảnh bìa playlist
      if (this.playlistImage) {
        this.playlistService.uploadPlaylistImage(playlistId, this.playlistImage).subscribe({
          next: (imageResponse) => {
            console.log('Tải ảnh bìa playlist thành công:', imageResponse);
            this.successMessage = 'Tạo playlist thành công!';
            this.resetForm();
          },
          error: (imageError: HttpErrorResponse) => {
            console.error('Lỗi khi tải ảnh bìa:', imageError);
            this.errorMessage = 'Lỗi khi tải ảnh bìa playlist.';
          }
        });
      } else {
        this.successMessage = 'Tạo playlist thành công!';
        this.resetForm();
      }
    },
    error: (error: HttpErrorResponse) => {
      console.error('Lỗi khi tạo playlist:', error);
      this.errorMessage = 'Lỗi khi tạo playlist. Vui lòng thử lại!';
    }
  });
}

  // Phương thức để xử lý khi người dùng chọn hình ảnh
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.playlistImage = file; // Lưu file ảnh bìa
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