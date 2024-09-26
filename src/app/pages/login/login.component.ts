import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { HomebeforeloginComponent } from '../homebeforelogin/homebeforelogin.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, SignupComponent, HomebeforeloginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
