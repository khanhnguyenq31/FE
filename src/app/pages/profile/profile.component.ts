import { Component } from '@angular/core';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SongsectionComponent, SidebarsectionComponent, ProfilemenuComponent, RouterLink],
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
}
