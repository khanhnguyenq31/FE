import { Component } from '@angular/core';
import { SidebarsectionComponent } from "../../components/sidebarsection/sidebarsection.component";
import { SongsectionComponent } from "../../components/songsection/songsection.component";
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';

@Component({
  selector: 'app-createlist',
  standalone: true,
  imports: [SidebarsectionComponent, SongsectionComponent, ProfilemenuComponent],
  templateUrl: './createlist.component.html',
  styleUrl: './createlist.component.css'
})
export class CreatelistComponent {
  hiddenFlag = true;
  iddenFlag = true;
  
  open() {
    this.hiddenFlag = false;
  }
  
  close() {
    this.hiddenFlag = true;
  }
}
