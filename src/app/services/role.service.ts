import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { ApiResponse } from "../responses/api.response";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private http = inject(HttpClient);

    private apiGetRoles = `${environment.apiBaseUrl}/roles`;
    getAllRole(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.apiGetRoles);
    }
}