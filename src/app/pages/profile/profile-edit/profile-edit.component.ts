import { Component } from '@angular/core';
import { SidebarsectionComponent } from '../../../components/sidebarsection/sidebarsection.component';
import { ProfilemenuComponent } from '../../../components/profilemenu/profilemenu.component';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [SidebarsectionComponent, ProfilemenuComponent],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent {
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(file);
    }
  }
}
