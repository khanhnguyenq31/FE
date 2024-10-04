import { Component } from '@angular/core';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [SongsectionComponent, SidebarsectionComponent, ProfilemenuComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
