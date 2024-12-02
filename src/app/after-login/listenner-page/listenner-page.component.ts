import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
@Component({
  selector: 'app-listenner-page',
  standalone: true,
  imports: [RouterOutlet , SongsectionComponent],
  templateUrl: './listenner-page.component.html',
  styleUrl: './listenner-page.component.css'
})
export class ListennerPageComponent {

}
