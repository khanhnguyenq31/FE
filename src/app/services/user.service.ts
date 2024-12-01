import { inject, Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environments";
import { Observable } from "rxjs";
import { HttpUtilService } from './http.util.service';
import { ApiResponse } from "../responses/api.response";
import { LoginDTO } from "../dtos/login.dto";
import { UserResponse } from "../responses/user.response";
import { DOCUMENT } from "@angular/common";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private httpUtilService = inject(HttpUtilService);
    private apiConfig = {
        headers: this.httpUtilService.createHeaders(),
    }

    localStorage?: Storage;
    constructor(
        @Inject(DOCUMENT) private document: Document
    ) {
        this.localStorage = document.defaultView?.localStorage;
    }

    private apiGetAllUser = `${environment.apiBaseUrl}/users`;
    getAllUser(params: { page: number, limit: number, keyword: string }): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiGetAllUser, { params: params });
    }

    private apiLogin = `${environment.apiBaseUrl}/users/login`;
    login(loginDTO: LoginDTO): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.apiLogin, loginDTO, this.apiConfig);
    }

    private apiUploadProfile = `${environment.apiBaseUrl}/users/upload-profile-image`;
    uploadProfileImage(files: File[]): Observable<ApiResponse> {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        // Upload images for user profile
        return this.http.post<ApiResponse>(this.apiUploadProfile, formData);
    }

    private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
    getUserDetail(token: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiUserDetail, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        });
    }

    private apiResetPassword = `${environment.apiBaseUrl}/users/reset-password`;
    resetPassword(userId: number, token: string): Observable<ApiResponse> {
        this.apiResetPassword += `${userId}`;
        return this.http.put<ApiResponse>(this.apiResetPassword, null, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        });
    }

    private apiToggleUser = `${environment.apiBaseUrl}/users/block/`;
    blockOrEnable(params: { userId: number, enable: boolean }): Observable<ApiResponse> {
        this.apiToggleUser += `${params.userId}/${params.enable ? '1' : '0'}`;
        return this.http.put<ApiResponse>(this.apiToggleUser, null, this.apiConfig);
    }

    /* --------------------------------------------------------------------------------- */
    /* -------------------------------ADVANCED FUNCTION--------------------------------- */
    /* --------------------------------------------------------------------------------- */
    saveUserResponseTLS(userResponse?: UserResponse) {
        try {
            if (userResponse == null || !userResponse) {
                return;
            }
            // Convert the userResponse object to a JSON string
            const userResponseJSON = JSON.stringify(userResponse);
            // Save the JSON string to local storage with a key (e.g., "userResponse")
            this.localStorage?.setItem('user', userResponseJSON);
            console.log('User response saved to local storage.');
        } catch (error) {
            console.error('Error saving user response to local storage:', error);
        }
    }

    getUserResponseTLS(): UserResponse | null {
        try {
            // Retrieve the JSON string from local storage using the key
            const userResponseJSON = this.localStorage?.getItem('user');
            if (userResponseJSON == null || userResponseJSON == undefined) {
                return null;
            }
            // Parse the JSON string back to an object
            const userResponse = JSON.parse(userResponseJSON!);
            console.log('User response retrieved from local storage.');
            return userResponse;
        } catch (error) {
            console.error('Error retrieving user response from local storage:', error);
            return null; // Return null or handle the error as needed
        }
    }

    removeUserResponseTLS(): void {
        try {
            // Remove the user data from local storage using the key
            this.localStorage?.removeItem('user');
            console.log('User data removed from local storage.');
        } catch (error) {
            console.error('Error removing user data from local storage:', error);
            // Handle the error as needed
        }
    }
}