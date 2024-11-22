import { Component  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [RouterLink, SidebarsectionComponent, SongsectionComponent, ProfilemenuComponent],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css',
})
export class SongsComponent {
 
}
