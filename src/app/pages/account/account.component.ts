import { Component } from '@angular/core';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { inject } from '@angular/core';
import { ApiResponse } from '../../responses/api.response';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [SongsectionComponent, SidebarsectionComponent, ProfilemenuComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
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
  logout() {
    // Xử lý đăng xuất
    console.log('Logging out');
    this.tokenService.removeToken();
    this.roleService.removeRole();
    this.router.navigate(['/']); // Điều hướng về trang beforelogin
  }
}
