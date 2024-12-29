import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-after-login',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.css'
})
export class AfterLoginComponent {

}
