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

  checkPasswordsMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword']
        .setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }

  register() {
    const message = `email: ${this.email}` +
      `username: ${this.username}` +
      `password: ${this.password}` +
      `retypePassword: ${this.retypePassword}` +
      `country: ${this.country}` +
      `dateOfBirth: ${this.dateOfBirth}` +
      `roleId: ${this.roleId}`;
    //console.error(message);

    const registerDTO: RegisterDTO = {
      email: this.email,
      username: this.username,
      password: this.password,
      retype_password: this.retypePassword,
      country: this.country,
      date_of_birth: this.dateOfBirth,
      role_id: this.roleId
    }
    
    this.loadingList = true;
    this.userService.register(registerDTO).subscribe({
      next: (apiResponse: ApiResponse) => {
        this.loadingList = false;
        console.log(registerDTO)
        const confirmation = window
          .confirm('Sign up successfully. Log in to discover more songs!!!');
        if (confirmation) {
          this.router.navigate(['/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loadingList = false;
        console.log(error)
      }
    });
  }

}
