import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [RouterLink, SidebarsectionComponent],
  templateUrl: './new-song.component.html',
  styleUrl: './new-song.component.css'
})
export class NewSongComponent {

}
