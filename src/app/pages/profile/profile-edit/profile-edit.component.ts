import { Component, ViewChild, ElementRef } from '@angular/core';
import { TokenService } from '../../../services/token.service'; // Adjust the path as necessary
import { ApiResponse } from '../../../responses/api.response'; // Adjust the path as necessary
import { HttpErrorResponse } from '@angular/common/http';
import { UserupdateinfoService } from '../../../services/userupdateinfo.service';
import { FormsModule } from '@angular/forms';
import { UploadProfileImageService } from '../../../services/upload-profile-image.service';
@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent  {
  selectedFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  username: string = '';
  email: string = '';
  password: string = '';
  country: string = '';
  dateOfBirth: string = '';
  confirmPassword: string = '';
  constructor(private uploadService: UploadProfileImageService, private tokenService: TokenService, private userUpdateInfoService: UserupdateinfoService) {}
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  uploadImage() {
    if (this.selectedFile) {
      this.uploadService.uploadProfileImage(this.selectedFile).subscribe({
        next: (response: ApiResponse) => {
          console.log('Upload successful:', response);
          alert('Profile image uploaded successfully!');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Upload failed:', error);
          alert('Failed to upload profile image.');
        }
      });
    } else {
      alert('Please select a file first.');
    }
  }

  updateUserInfo() {
    const token = this.tokenService.getToken(); // Get the token from the TokenService
    const userInfo: any = {}; // Khởi tạo đối tượng userInfo rỗng

    // Chỉ thêm các trường có giá trị
    if (this.username) userInfo.username = this.username;
    if (this.email) userInfo.email = this.email;
    if (this.password) userInfo.password = this.password;
    if (this.country) userInfo.country = this.country;
    if (this.dateOfBirth) userInfo.date_of_birth = this.dateOfBirth;
    // Kiểm tra mật khẩu
    if (this.password && this.password !== this.confirmPassword) {
        alert("Mật khẩu và mật khẩu nhập lại không khớp!");
        return; // Ngăn không cho submit nếu mật khẩu không khớp
    }

    this.userUpdateInfoService.updateUserInfo(token, userInfo).subscribe({
        next: (response: ApiResponse) => {
            console.log('Update successful:', response);
            alert("Cập nhập thành công!"); // Hiển thị thông báo thành công
            // Reset lại các trường trong form
            this.username = '';
            this.email = '';
            this.password = '';
            this.country = '';
            this.dateOfBirth = '';
            this.confirmPassword = '';
        },
        error: (error: HttpErrorResponse) => {
            console.error('Update failed:', error);
        }
    });
  }
}
