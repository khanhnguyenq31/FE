import { Component } from '@angular/core';
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
  imports: [ CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  tokenService = inject(TokenService); 
  roleService = inject(RoleService); 
  router = inject(Router); 
  navigateTo(section: 'profile/edit' | 'reset-password') {
    const role = this.roleService.getRole(); 
    let targetRoute = '';

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
    this.router.navigate([targetRoute]);
  }
  username: string = '';
  imageUrl: string | null = null;
  country: string = ''
  created_at: string =''
  date_of_birth: string = ''
  email: string ='' 
  role: string =''
  constructor(private userDetailService: UserDetailService, private tokenSvc: TokenService) {}

  ngOnInit() {
    const token = this.tokenSvc.getToken();
    this.userDetailService.getUserDetails(token).subscribe({
      next: (response: ApiResponse) => {
        console.log(response)
        if (response.status === 'OK') {
          this.username = response.data.username;
          this.imageUrl = response.data.image_url;
          this.country = response.data.country;
          this.created_at = response.data.created_at;
          this.email = response.data.email;
          this.date_of_birth = response.data.date_of_birth;
          this.role = response.data.role.name;
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

}
