import { Component } from '@angular/core';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [SidebarsectionComponent,RouterLink],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})
export class AlbumsComponent {

}
