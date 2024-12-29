import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
@Component({
  selector: 'app-listenner-page',
  standalone: true,
  imports: [RouterOutlet , SongsectionComponent, HeaderComponent, SidebarsectionComponent],
  templateUrl: './listenner-page.component.html',
  styleUrl: './listenner-page.component.css'
})
export class ListennerPageComponent {

}
