import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ){}

    async login(user: LoginDto){
        const realUser = await this.prisma.user.findUnique({
            where: {email: user.email}
        })
        if(realUser && await bcrypt.compare(user.password, realUser.password)){
            const payload = {sub: realUser.id, email: realUser.email}
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        }
        throw new BadRequestException('Неверный email или пароль')
    }

    async register(user: RegisterDto){
        const {fullName, email, phoneNumber, dateOfBirth, password, repassword} = {...user}
        const checkUser = await this.prisma.user.findUnique({
            where: {email: email}
        })
        const checkPhone = await this.prisma.user.findUnique({
            where: {phoneNumber: phoneNumber}
        })
        if (checkUser){
            throw new ConflictException('Пользователь с таким email уже существует')
        } else if (checkPhone){
            throw new ConflictException('Пользователь с таким номером телефона уже существует')
        }
        
        // Сравнение паролей    
        if(password != repassword){
            throw new BadRequestException('Пароли не совпадают')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        return this.prisma.user.create({
            data: {
                fullName, email, phoneNumber, dateOfBirth, password: hashedPassword
            }
        })
    }
}
