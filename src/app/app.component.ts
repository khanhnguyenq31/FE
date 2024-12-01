import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { SongsectionComponent } from "./components/songsection/songsection.component";
import { CreatelistComponent } from './pages/createlist/createlist.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { SidebarsectionComponent } from "./components/sidebarsection/sidebarsection.component";
import { Router, NavigationEnd } from '@angular/router';
import { NewAlbumComponent } from './artist/albums/new-album/new-album.component';
import { SongsComponent } from './artist/songs/songs.component';
import { AlbumsComponent } from './artist/albums/albums.component';
import { NewSongComponent } from './artist/songs/new-song/new-song.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, HomeComponent, CommonModule, SongsectionComponent, CreatelistComponent, PlaylistComponent, 
    SidebarsectionComponent,FormsModule, NewAlbumComponent, SongsComponent, AlbumsComponent,NewSongComponent],
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
