import { Component } from '@angular/core';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { RouterLink } from '@angular/router';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SongsectionComponent, SidebarsectionComponent, RouterLink , ProfilemenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
