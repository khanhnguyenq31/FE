import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

@Component({
  selector: 'app-songsection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songsection.component.html',
  styleUrl: './songsection.component.css'
})
export class SongsectionComponent  {
  isLiked = false;
  showTooltip = false;

  toggleLike() {
    this.isLiked = !this.isLiked;
  }

  get heartColor() {
    return this.isLiked ? 'text-red-500' : 'text-white';
  }

  get hoverText() {
    return this.isLiked ? 'Hủy thích' : 'Thích';
  }
}
