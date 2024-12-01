import {
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate
} from 'class-validator';

export class RegisterDTO {
    @IsNotEmpty()
    email: string;

    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    retype_password: string;

    @IsString()
    country: string;

    @IsDate()
    date_of_birth: Date;

    role_id: number = 3;

    constructor(data: any) {
        this.email = data.email;
        this.username = data.username;
        this.password = data.password;
        this.retype_password = data.retype_password;
        this.country = data.country;
        this.date_of_birth = data.date_of_birth;
        this.role_id = data.role_id || 3;
    }
}