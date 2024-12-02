import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SongsectionComponent } from '../components/songsection/songsection.component';

@Component({
  selector: 'app-after-login',
  standalone: true,
  imports: [ RouterOutlet , SongsectionComponent],
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.css'
})
export class AfterLoginComponent {

}
