import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { RoleService } from "../../services/role.service";
import { TokenService } from "../../services/token.service";
import { UserService } from "../../services/user.service";

export class BaseComponent {
    userService: UserService = inject(UserService);
    roleService: RoleService = inject(RoleService);
    tokenService: TokenService = inject(TokenService);

    router: Router = inject(Router);
}