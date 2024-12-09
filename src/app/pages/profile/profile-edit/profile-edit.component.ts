import { Component } from '@angular/core';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';
import { ProfilemenuComponent } from '../../../components/profilemenu/profilemenu.component';
import { TokenService } from '../../../services/token.service'; // Adjust the path as necessary
import { ApiResponse } from '../../../responses/api.response'; // Adjust the path as necessary
import { HttpErrorResponse } from '@angular/common/http';
import { UserupdateinfoService } from '../../../services/userupdateinfo.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [SidebarsectionComponent, ProfilemenuComponent, FormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(file);
    }
  }
  username: string = '';
  email: string = '';
  password: string = '';
  country: string = '';
  dateOfBirth: string = '';
  confirmPassword: string = '';
  constructor(private tokenService: TokenService, private userUpdateInfoService: UserupdateinfoService) {}
  updateUserInfo() {
    if (this.password !== this.confirmPassword) {
      alert("Mật khẩu và mật khẩu nhập lại không khớp!");
      return; // Ngăn không cho submit nếu mật khẩu không khớp
    }
    const token = this.tokenService.getToken(); // Get the token from the TokenService
    const userInfo = {
      username: this.username,
      email: this.email,
      password: this.password,
      country: this.country,
      date_of_birth: this.dateOfBirth
    };

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
        // Handle error response
      }
    });
  }
}
