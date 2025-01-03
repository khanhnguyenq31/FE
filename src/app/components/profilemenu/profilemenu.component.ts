import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { inject } from '@angular/core';
import { ApiResponse } from '../../responses/api.response';
import { UserDetailService } from '../../services/user-detail.service';
import { PlaySongService } from '../../services/play-song.service';

@Component({
  selector: 'app-profilemenu',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './profilemenu.component.html',
  styleUrl: './profilemenu.component.css'
})
export class ProfilemenuComponent {
  isMenuOpen = false;
  tokenService = inject(TokenService); // Inject AuthService
  roleService = inject(RoleService); // Inject AuthService
  router = inject(Router); // Inject Router
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(section: 'profile' | 'account' | 'settings') {
    const role = this.roleService.getRole(); // Lấy role hiện tại của người dùng
    let targetRoute = '';

    // Xác định route dựa trên role và section
    switch (role) {
      case 'ADMIN':
        targetRoute = `/afterlogin/adminpage/${section}`;
        break;

      case 'LISTENER':
        targetRoute = `/afterlogin/listenerpage/${section}`;
        break;

      case 'ARTIST':
        targetRoute = `/afterlogin/artistpage/${section}`;
        break;

      default:
        console.error('Unknown role:', role);
        return;
    }

    // Điều hướng tới route mục tiêu
    this.router.navigate([targetRoute]);
    this.isMenuOpen = false; // Đóng menu sau khi chọn
  }

  logout() {
    // Xử lý đăng xuất
    console.log('Logging out');
    this.tokenService.removeToken();
    this.roleService.removeRole();

    this.playSongService.play = false;
    this.playSongService.currentTime = "0:00";
    this.playSongService.totalTime = "0:00";

    this.isMenuOpen = false; // Đóng menu sau khi chọn
  }

  username: string = '';
  imageUrl: string | null = null;

  constructor(private userDetailService: UserDetailService, 
              private tokenSvc: TokenService,
              private playSongService: PlaySongService) {}

  ngOnInit() {
    const token = this.tokenSvc.getToken();
    this.userDetailService.getUserDetails(token).subscribe({
      next: (response: ApiResponse) => {
        if (response.status === 'OK') {
          this.username = response.data.username;
          this.imageUrl = response.data.image_url; // Lưu trữ URL hình ảnh
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

}
