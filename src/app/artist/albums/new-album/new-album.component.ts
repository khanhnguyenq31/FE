import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';

@Component({
  selector: 'app-new-album',
  standalone: true,
  imports: [RouterLink,SidebarsectionComponent,FormsModule ],
  templateUrl: './new-album.component.html',
  styleUrl: './new-album.component.css'
})
export class NewAlbumComponent {
  selectedSongs: Set<number> = new Set();

  constructor() {}

  ngOnInit(): void {
    const selectElement = document.getElementById('songs') as HTMLSelectElement;
    selectElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLOptionElement;
      if (target.tagName === 'OPTION') {
        const value = parseInt(target.value);
        if (this.selectedSongs.has(value)) {
          this.selectedSongs.delete(value);
          target.classList.remove('selected');
        } else {
          this.selectedSongs.add(value);
          target.classList.add('selected');
        }
      }
    });
  }
}