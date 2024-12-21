import { Component } from '@angular/core';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { RouterLink } from '@angular/router';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { RoleService } from '../../services/role.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarsectionComponent, RouterLink , ProfilemenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  role: string = '';
  hiddenFlag = true;
  iddenFlag = true;
  
  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.role = this.roleService.getRole();
  }
  // open the notification
  open() {
    this.hiddenFlag = false;
  }
  
  // close the notification
  close() {
    this.hiddenFlag = true;
  }
}
