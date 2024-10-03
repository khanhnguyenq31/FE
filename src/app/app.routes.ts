import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomebeforeloginComponent } from './pages/homebeforelogin/homebeforelogin.component';
import { LikedsongsComponent } from './pages/likedsongs/likedsongs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
    {path:'', component: HomebeforeloginComponent},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'likedsongs', component: LikedsongsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'settings', component: SettingsComponent },
];
