import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomebeforeloginComponent } from './pages/homebeforelogin/homebeforelogin.component';
import { LikedsongsComponent } from './pages/likedsongs/likedsongs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AccountComponent } from './pages/account/account.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { CreatelistComponent } from './pages/createlist/createlist.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
    {path:'', component: HomebeforeloginComponent},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'likedsongs', component: LikedsongsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'account', component: AccountComponent },
    { path:'playlist',component:PlaylistComponent},
    { path:'createlist',component:CreatelistComponent},
    { path:'search',component:SearchComponent}
];
