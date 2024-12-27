import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Role } from '../../models/role';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../responses/api.response';
import { FormsModule, NgForm } from '@angular/forms';
import { UserResponse } from '../../responses/user.response';
import { LoginDTO } from '../../dtos/login.dto';
import { BaseComponent } from '../base/base.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  email: string;
  username: string;
  password: string;
  showPassword: boolean;
  validationMessage: string = '';

  roles: Role[] = [];
  selectedRole !: number; 
  loadingList: boolean = false;
  userResponse?: UserResponse;

  constructor() {
    super();
    this.email = '';
    this.username = '';
    this.password = '';
    this.showPassword = false;
  }

  ngOnInit(): void {
    this.roleService.getAllRole().subscribe({
      next: (apiResponse: ApiResponse) => {
        const roles = apiResponse.data;
        this.roles = roles;
        console.log(roles.id)
        this.selectedRole = roles.length > 0 ? roles[2].id : 1;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error?.error?.message ?? '');
      }
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      alert('Please enter valid email and password.');
      return;
    }

    if (!this.email || !this.password) {
      alert('Please enter both email and password.');
      return;
    }

    if (this.email.endsWith('@gmail.com')) {
      this.email = this.email; // Gán giá trị vào email
    } else {
      this.email = '';
      this.username = this.email; // Nếu không, gán email là rỗng
    }

    const loginDTO: LoginDTO = {
      email: this.email,
      username: this.username,
      password: this.password,
      role_id: this.selectedRole
    };
    //debugger;

    this.loadingList = true;
    this.userService.login(loginDTO).subscribe({
      next: (apiResponse: ApiResponse) => {
        //debugger;
        const { token } = apiResponse.data;
        this.tokenService.setToken(token);
        //debugger;
        this.userService.getUserDetail(token).subscribe({
          next: (apiResponse2: ApiResponse) => {
            this.loadingList = false
            this.userResponse = {
              ...apiResponse2.data,
              date_of_birth: new Date(apiResponse2.data.date_of_birth),
            };

            this.userService.saveUserResponseTLS(this.userResponse);
            //debugger;
            if (this.userResponse?.role.name == 'ADMIN') {//////////////////////////
              this.roleService.setRole('ADMIN')
              this.router.navigate(['/afterlogin/adminpage']);
            } else if (this.userResponse?.role.name == 'LISTENER') {
              this.roleService.setRole('LISTENER')
              this.router.navigate(['/afterlogin/listenerpage']); ///home
            } else if (this.userResponse?.role.name == 'ARTIST') {
              this.roleService.setRole('ARTIST')
              this.router.navigate(['/afterlogin/artistpage']);
            }
          },
          error: (error: HttpErrorResponse) => {
            this.loadingList = false;
            console.error(error?.error?.message ?? '');
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        alert(error.error.message);
        this.loadingList = false
      }
    });
  }

}
