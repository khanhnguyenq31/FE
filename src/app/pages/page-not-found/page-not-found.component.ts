import { Component, inject } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})

export class PageNotFoundComponent {
  private tokenService = inject(TokenService); // Inject TokenService
  private router = inject(Router); // Inject Router
  private roleService = inject(RoleService); // Inject RoleService

  back() {
    console.log(this.router)
    console.log(this.tokenService.isLoggedIn())
    if (this.tokenService.isLoggedIn()) {
      if (this.roleService.getRole() === 'ADMIN') {
        this.router.navigate(['/afterlogin/adminpage']);
      } else if (this.roleService.getRole() === 'LISTENER') {
        this.router.navigate(['/afterlogin/listenerpage']); // Chuyển hướng về trang chính hoặc trang khác
      } else if (this.roleService.getRole() === 'ARTIST') {
        this.router.navigate(['/afterlogin/artistpage']); // Chuyển hướng về trang chính hoặc trang khác
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
