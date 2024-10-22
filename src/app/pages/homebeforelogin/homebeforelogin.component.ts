import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { SongsectionComponent } from "../../components/songsection/songsection.component";
import { CommonModule } from '@angular/common';
import { SidebarsectionComponent } from "../../components/sidebarsection/sidebarsection.component";
import { HomeComponent } from "../home/home.component";
import { ProfilemenuComponent } from '../../components/profilemenu/profilemenu.component';

@Component({
  selector: 'app-homebeforelogin',
  standalone: true,
  imports: [RouterLink, ProfilemenuComponent ,SignupComponent, LoginComponent, SongsectionComponent, CommonModule, SidebarsectionComponent, HomeComponent],
  templateUrl: './homebeforelogin.component.html',
  styleUrls: ['./homebeforeloginstyle/homebeforelogin.component.css', 
    './homebeforeloginstyle/footer.css']
})
export class HomebeforeloginComponent {
  hiddenFlag = true;
  iddenFlag = true;
  
  // open the notification
  open() {
    this.hiddenFlag = false;
  }
  
  // close the notification
  close() {
    this.hiddenFlag = true;
  }
  
}
