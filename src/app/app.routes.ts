import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomebeforeloginComponent } from './pages/homebeforelogin/homebeforelogin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { CreatelistComponent } from './pages/createlist/createlist.component';
import { SearchComponent } from './pages/search/search.component';
import { SongsComponent } from './artist/songs/songs.component';
import { AlbumsComponent } from './artist/albums/albums.component';
import { NewSongComponent } from './artist/songs/new-song/new-song.component';
import { NewAlbumComponent } from './artist/albums/new-album/new-album.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit.component';
import { AfterLoginComponent } from './pages/after-login/after-login.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ManageSongComponent } from './pages/manage-song/manage-song.component';
import { ManageAlbumComponent } from './pages/manage-album/manage-album.component';
import { ListennerPageComponent } from './pages/listenner-page/listenner-page.component'
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { auth4AdminGuard } from './guard/auth4-admin.guard';
import { auth4ListenerGuard } from './guard/auth4-listener.guard';
import { auth4artistGuard } from './guard/auth4-artist.guard';
import { authGuard } from './guard/auth.guard';
import { ManagePlaylistComponent } from './pages/mange-playlist/mange-playlist.component';

export const routes: Routes = [
    {path:'', component: HomebeforeloginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'reset-password', component: ResetPasswordComponent},
    { 
        path: 'afterlogin', component: AfterLoginComponent, 
        canActivate: [authGuard],
        children: [
        { path: 'adminpage' , component: AdminPageComponent,
            canActivate: [auth4AdminGuard], children: [
            { path: '', component: ManageSongComponent },               
            { path: 'profile', component: ProfileComponent },
            { path: 'profile/edit', component: ProfileEditComponent },
            { path: 'manageAlbum', component: ManageAlbumComponent },
            { path: 'managePlaylist', component: ManagePlaylistComponent },
        ]},
        { path: 'listenerpage' , component: ListennerPageComponent, 
            canActivate: [auth4ListenerGuard], 
            children: [
                { path: '', component: HomeComponent },
                { path: 'profile', component: ProfileComponent },
                { path: 'profile/edit', component: ProfileEditComponent },
                { path: 'playlists/:id', component: PlaylistComponent},
                { path: 'createlist', component:CreatelistComponent},
                { path: 'search', component: SearchComponent},
                { path: 'profile/edit', component: ProfileEditComponent },
                { path: 'reset-password', component: ResetPasswordComponent},
                  
            ]
        },
        { path: 'artistpage' , component: ListennerPageComponent, 
            canActivate: [auth4artistGuard],
            children: [
                { path: '', component: HomeComponent },
                { path: 'profile', component: ProfileComponent },
                { path: 'profile/edit', component: ProfileEditComponent },
                { path: 'playlists/:id', component: PlaylistComponent},
                { path: 'createlist', component:CreatelistComponent},
                { path: 'search', component:SearchComponent},
                { path: 'reset-password', component: ResetPasswordComponent},
                { path: 'songs', component:SongsComponent},
                { path: 'songs/new', component:NewSongComponent},
                { path: 'albums/new', component:NewAlbumComponent},
                { path: 'albums/:id', component:AlbumsComponent}, 
                  
            ]
        },
        { path: '**', component: PageNotFoundComponent }
    ]},
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' } 
];
