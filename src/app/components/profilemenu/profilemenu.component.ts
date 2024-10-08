import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profilemenu',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './profilemenu.component.html',
  styleUrl: './profilemenu.component.css'
})
export class ProfilemenuComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(route: string) {
    // Xử lý điều hướng tới các trang khác
    console.log(`Navigating to ${route}`);
    this.isMenuOpen = false; // Đóng menu sau khi chọn
  }

  logout() {
    // Xử lý đăng xuất
    console.log('Logging out');
    this.isMenuOpen = false; // Đóng menu sau khi chọn
  }
}
