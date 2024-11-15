import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';

@Component({
  selector: 'app-likedsongs',
  standalone: true,
  imports: [RouterLink, HomeComponent, SidebarsectionComponent, SongsectionComponent, ProfilemenuComponent],
  templateUrl: './likedsongs.component.html',
  styleUrl: './likedsongs.component.css'
})
export class LikedsongsComponent {
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
