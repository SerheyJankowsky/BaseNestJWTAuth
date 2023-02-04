import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignPipe } from './pipe';
import { SignUpDto } from './dto/signUp';
import { LoginDto } from './dto/login';
import { Auth } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @SignPipe()
  signup(@Body() newUser: SignUpDto) {
    return this.authService.signUp(newUser);
  }

  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Get('user')
  @Auth()
  sendUser(@Request() req) {
    return this.authService.sendUser(req.user);
  }
}
