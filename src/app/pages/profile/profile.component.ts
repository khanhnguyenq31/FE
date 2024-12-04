import { Component, OnInit } from '@angular/core';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { RouterLink } from '@angular/router';
import { UserDetailService } from '../../services/user-detail.service';
import { TokenService } from '../../services/token.service';
import { ApiResponse } from '../../responses/api.response';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ SidebarsectionComponent, ProfilemenuComponent, RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
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

  constructor(private userDetailService: UserDetailService, private tokenService: TokenService) {}

  ngOnInit() {
    const token = this.tokenService.getToken();
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
