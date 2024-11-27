import { Role } from "../models/role";

export interface UserResponse {
    id: number;
    email: string;
    password: string;
    country: string;
    date_of_birth: Date;
    role: Role;
}