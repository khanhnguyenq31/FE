import { Component, OnInit } from '@angular/core';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { RouterLink } from '@angular/router';
import { UserDetailService } from '../../services/user-detail.service';
import { TokenService } from '../../services/token.service';
import { ApiResponse } from '../../responses/api.response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ SidebarsectionComponent, ProfilemenuComponent, RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  tokenService = inject(TokenService); // Inject AuthService
  roleService = inject(RoleService); // Inject AuthService
  router = inject(Router); // Inject Router
  navigateTo(section: 'profile/edit' | 'reset-password') {
    const role = this.roleService.getRole(); // Lấy role hiện tại của người dùng
    let targetRoute = '';

    // Xác định route dựa trên role và section
    switch (role) {
      case 'ADMIN':
        if (section === 'profile/edit') targetRoute = '/afterlogin/adminpage';
        else if (section === 'reset-password') targetRoute = '/afterlogin/adminpage/manageUser';
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
  }
  hiddenFlag = true;
  iddenFlag = true;
  
  // open the notification
  open() {
    this.hiddenFlag = false;
  }
  
  // close the notification
  close() {
    this.hiddenFlag = true;
  }

  username: string = '';
  imageUrl: string | null = null;

  constructor(private userDetailService: UserDetailService, private tokenSvc: TokenService) {}

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
