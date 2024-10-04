import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { SongsectionComponent } from "../../components/songsection/songsection.component";
import { CommonModule } from '@angular/common';
import { SidebarsectionComponent } from "../../components/sidebarsection/sidebarsection.component"; // Import CommonModule

@Component({
  selector: 'app-homebeforelogin',
  standalone: true,
  imports: [RouterLink, SignupComponent, LoginComponent, SongsectionComponent, CommonModule, SidebarsectionComponent],
  templateUrl: './homebeforelogin.component.html',
  styleUrls: ['./homebeforeloginstyle/homebeforelogin.component.css', 
    './homebeforeloginstyle/header.css', 
    './homebeforeloginstyle/sidebar.css', 
    './homebeforeloginstyle/main.css',
    './homebeforeloginstyle/notification.css', 
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
