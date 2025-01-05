import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NgForm } from '@angular/forms';
import { RegisterDTO } from '../../dtos/register.dto';
import { BaseComponent } from '../base/base.component';
import { ApiResponse } from '../../responses/api.response';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent extends BaseComponent {
  @ViewChild('registerForm') registerForm!: NgForm;

  email: string;
  username: string;
  password: string;
  retypePassword: string;
  country: string;
  dateOfBirth: Date;
  roleId: number;
  loadingList: boolean = false;

  constructor() {
    super();

    this.email = '';
    this.username = '';
    this.password = '';
    this.retypePassword = '';
    this.country = '';
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    this.roleId = 3;
  }

  register() {
    const message = `email: ${this.email}` +
      `username: ${this.username}` +
      `password: ${this.password}` +
      `retypePassword: ${this.retypePassword}` +
      `country: ${this.country}` +
      `dateOfBirth: ${this.dateOfBirth}` +
      `roleId: ${this.roleId}`;

    const registerDTO: RegisterDTO = {
      email: this.email,
      username: this.username,
      password: this.password,
      retype_password: this.retypePassword,
      country: this.country,
      date_of_birth: this.dateOfBirth,
      role_id: this.roleId
    }
    
    if (!(registerDTO.email 
      && registerDTO.password 
      && registerDTO.role_id 
      && registerDTO.username 
      && registerDTO.retype_password
      && registerDTO.country
      && registerDTO.date_of_birth)) {
      alert('Please fill all the information')
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email) ) {
      alert('Email is not in the right format')
      return;
    }
    
    if (this.password !== this.retypePassword) {
      alert('Password and retype-password are not the same')
      return;
    }

    this.loadingList = true;
    this.userService.register(registerDTO).subscribe({
      next: (apiResponse: ApiResponse) => {
        this.loadingList = false;
        const confirmation = window
          .confirm('Sign up successfully. Log in to discover more songs!!!');
        if (confirmation) {
          this.router.navigate(['/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loadingList = false;
        alert(error.error.message)
      }
    });
  }

}
