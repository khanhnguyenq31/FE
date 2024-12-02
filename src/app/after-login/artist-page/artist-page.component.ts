import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongsectionComponent } from '../../components/songsection/songsection.component';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  imports: [RouterOutlet , SongsectionComponent],
  templateUrl: './artist-page.component.html',
  styleUrl: './artist-page.component.css'
})
export class ArtistPageComponent {

}
