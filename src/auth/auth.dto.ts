import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    password: string
}

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    fullName: string
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    phoneNumber: string
    @IsString()
    @IsNotEmpty()
    dateOfBirth: string
    @IsString()
    @IsNotEmpty()
    password: string
    @IsString()
    @IsNotEmpty()
    repassword: string
}