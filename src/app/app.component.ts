import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { SongsectionComponent } from "./components/songsection/songsection.component";
import { CreatelistComponent } from './pages/createlist/createlist.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { SidebarsectionComponent } from "./components/sidebarsection/sidebarsection.component";
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, HomeComponent, CommonModule, SongsectionComponent, CreatelistComponent, PlaylistComponent, 
    SidebarsectionComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend-CNPM';
  status : boolean = true;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/login' 
          || event.urlAfterRedirects === '/'
          || event.urlAfterRedirects === '/signup' 
          || event.urlAfterRedirects === '') {
          this.status = false;
        }
        else this.status = true;
      }
    });
  }
}
