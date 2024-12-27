import { Component } from '@angular/core';
import { RouterOutlet , RouterLink, Router } from '@angular/router';
import { SongsectionComponent } from '../../components/songsection/songsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';
@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterOutlet , RouterLink , SongsectionComponent, ProfilemenuComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  
}
