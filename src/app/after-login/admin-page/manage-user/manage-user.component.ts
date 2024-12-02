import { Component } from '@angular/core';
import { NgIf , NgFor } from '@angular/common';
@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [NgIf , NgFor],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent {
  users = [
    {
      username: 'User1',
      accountType: 'Người nghe',
      active: true,
      songs: [],
      albums: [],
    },
    {
      username: 'Artist1',
      accountType: 'Nghệ sĩ',
      active: false,
      songs: ['Song 1', 'Song 2'],
      albums: ['Album 1'],
    },
    {
      username: 'User2',
      accountType: 'Người nghe',
      active: true,
      songs: [],
      albums: [],
    },
  ];

  hiddenDetail = true;
  selectedUser: any = null;

  toggleActivation(user: any) {
    user.active = !user.active;
  }

  deleteUser(user: any) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  viewDetails(user: any) {
    this.selectedUser = user;
    this.hiddenDetail = false;
  }

  closeDetails() {
    this.hiddenDetail = true;
    this.selectedUser = null;
  }
}
