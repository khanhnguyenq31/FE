import { Component } from '@angular/core';
import { RouterLink , Router} from '@angular/router';
import { inject } from '@angular/core';
import { RoleService } from '../../services/role.service';
@Component({
  selector: 'app-sidebarsection',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebarsection.component.html',
  styleUrl: './sidebarsection.component.css'
})
export class SidebarsectionComponent {
  constructor(private router: Router , private roleService: RoleService) {
    if (this.roleService.getRole() === 'ADMIN') {
      this.home = "/afterlogin/adminpage"
      this.playlist = "/afterlogin/adminpage/playlist"
      this.createlist = "/afterlogin/adminpage/createlist"
      this.likedsongs = "/afterlogin/adminpage/likedsongs"
      this.search = "/afterlogin/adminpage/search"
    } else if (this.roleService.getRole() === 'LISTENER') {
      this.home = "/afterlogin/listenerpage"
      this.playlist = "/afterlogin/listenerpage/playlist"
      this.createlist = "/afterlogin/listenerpage/createlist"
      this.likedsongs = "/afterlogin/listenerpage/likedsongs"
      this.search = "/afterlogin/listenerpage/search"
    } else if (this.roleService.getRole() === 'ARTIST') {
      this.home = "/afterlogin/artistpage"
      this.playlist = "/afterlogin/artistpage/playlist"
      this.createlist = "/afterlogin/artistpage/createlist"
      this.likedsongs = "/afterlogin/artistpage/likedsongs"
      this.search = "/afterlogin/artistpage/search"
    }
  }

  home: string = ""
  playlist: string = ""
  createlist: string =""
  likedsongs: string = ""
  search: string = ""
}
