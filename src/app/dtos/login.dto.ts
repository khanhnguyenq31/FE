import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class LoginDTO {
    @IsPhoneNumber()
    email: string;

    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    role_id: number;

    constructor(data: any) {
        this.email = data.phone_number;
        this.username = data.username;
        this.password = data.password;
        this.role_id = data.role_id
    }
}