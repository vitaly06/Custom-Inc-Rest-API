import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDto){
    return this.authService.login(user)
  }

  @Post('register')
  async register(@Body() user: RegisterDto){
    return this.authService.register(user)
  }
}
