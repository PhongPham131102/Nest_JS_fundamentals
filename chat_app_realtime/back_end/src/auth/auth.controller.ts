import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { jwtRTAuthGuard } from './guards/jwt-refresh-token-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @Post('Login')
  async Login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.LogIn(loginUserDto);
  }
  @UseGuards(jwtRTAuthGuard)
  @Post('refresh')
  refresh(@Req() req, @Body() body: any) {
    return this.authService.refreshToken(body, req);
  }
}
