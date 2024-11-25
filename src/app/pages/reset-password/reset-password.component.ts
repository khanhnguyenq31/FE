import { Component } from '@angular/core';
import { SidebarsectionComponent } from '../../components/sidebarsection/sidebarsection.component';
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [SidebarsectionComponent, ProfilemenuComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

}
