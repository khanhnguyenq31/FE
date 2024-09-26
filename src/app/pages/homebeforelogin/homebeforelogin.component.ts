import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-homebeforelogin',
  standalone: true,
  imports: [RouterLink, SignupComponent, LoginComponent],
  templateUrl: './homebeforelogin.component.html',
  styleUrl: './homebeforelogin.component.css'
})
export class HomebeforeloginComponent {

}
