import { inject, Injectable , Inject } from "@angular/core";
import { environment } from "../../environments/environments";
import { ApiResponse } from "../responses/api.response";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private readonly ROLE_KEY = 'access_role';
    private http = inject(HttpClient);
    localStorage?: Storage;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.localStorage = document.defaultView?.localStorage;
    }

    private apiGetRoles = `${environment.apiBaseUrl}/roles`;
    getAllRole(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiGetRoles);
    }

    getRole(): string { return this.localStorage?.getItem(this.ROLE_KEY) ?? ''; }

    setRole(role: string): void { this.localStorage?.setItem(this.ROLE_KEY, role); }

    removeRole() {
        this.localStorage?.removeItem(this.ROLE_KEY);
    }
}