import { Component } from '@angular/core';
import { SongsectionComponent } from "../../components/songsection/songsection.component";
import { SidebarsectionComponent } from "../../components/sidebarsection/sidebarsection.component";
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [SongsectionComponent, SidebarsectionComponent, ProfilemenuComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

}
