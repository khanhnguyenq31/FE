import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
import { SongsComponent } from './artist/songs/songs.component';
import { AlbumsComponent } from './artist/albums/albums.component';
import { NewSongComponent } from './artist/songs/new-song/new-song.component';
import { NewAlbumComponent } from './artist/albums/new-album/new-album.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ProfileEditComponent } from './pages/profile/profile-edit/profile-edit.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { AdminPageComponent } from './after-login/admin-page/admin-page.component';
import { ManageSongComponent } from './after-login/admin-page/manage-song/manage-song.component';
import { ManageAlbumComponent } from './after-login/admin-page/manage-album/manage-album.component';
import { ManageUserComponent } from './after-login/admin-page/manage-user/manage-user.component';
import { ManageReportComponent } from './after-login/admin-page/manage-report/manage-report.component';
import { ListennerPageComponent } from './after-login/listenner-page/listenner-page.component'
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { auth4AdminGuard } from './auth4-admin.guard';
import { auth4ListenerGuard } from './auth4-listener.guard';
import { auth4artistGuard } from './auth4-artist.guard';
import { authGuard } from './auth.guard';


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
            { path: 'manageAlbum', component: ManageAlbumComponent },
            { path: 'manageUser', component: ManageUserComponent },
            { path: 'manageReport', component: ManageReportComponent }
        ]},
        { path: 'listenerpage' , component: ListennerPageComponent, 
            canActivate: [auth4ListenerGuard], 
            children: [
                { path: '', component: HomeComponent },
                { path: 'likedsongs', component: LikedsongsComponent },
                { path: 'profile', component: ProfileComponent },
                { path: 'settings', component: SettingsComponent },
                { path: 'account', component: AccountComponent },
                { path: 'playlists/:id', component: PlaylistComponent},
                { path: 'createlist', component:CreatelistComponent},
                { path: 'search', component:SearchComponent},
                { path: 'profile/edit', component: ProfileEditComponent },
                { path: 'reset-password', component: ResetPasswordComponent},
                  
            ]
        },
        { path: 'artistpage' , component: ListennerPageComponent, 
            canActivate: [auth4artistGuard],
            children: [
                { path: '', component: HomeComponent },
                { path: 'likedsongs', component: LikedsongsComponent },
                { path: 'profile', component: ProfileComponent },
                { path: 'settings', component: SettingsComponent },
                { path: 'account', component: AccountComponent },
                { path: 'playlists/:id', component: PlaylistComponent},
                { path: 'createlist', component:CreatelistComponent},
                { path: 'search', component:SearchComponent},
                { path: 'profile/edit', component: ProfileEditComponent },
                { path: 'reset-password', component: ResetPasswordComponent},
                { path: 'songs', component:SongsComponent},
                { path: 'songs/new', component:NewSongComponent},
                { path: 'albums/new', component:NewAlbumComponent},
                { path: 'profile/edit', component: ProfileEditComponent },
                { path: 'albums/:id', component:AlbumsComponent}, 
                  
            ]
        },
        { path: '**', component: PageNotFoundComponent }
    ]},
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'not-found' } 
];
