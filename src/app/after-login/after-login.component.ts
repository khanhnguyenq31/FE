import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { CommonModule } from '@angular/common';
import { SongsectionComponent } from "../components/songsection/songsection.component";
import { CreatelistComponent } from '../pages/createlist/createlist.component';
import { PlaylistComponent } from '../pages/playlist/playlist.component';
import { SidebarsectionComponent } from "../components/sidebarsection/sidebarsection.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-after-login',
  standalone: true,
  imports: [ RouterLink, RouterOutlet ],
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.css'
})
export class AfterLoginComponent {

}
