import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(user: CreateUserDto): Promise<any> {
    return this.userService.createUser(user);
  }
  async LogIn(loginUser: LoginUserDto): Promise<any> {
    const user = await this.userService.loginUser(loginUser);
    if (!user)
      throw new HttpException(
        'user name and password incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    const checkPassword = await bcrypt.compare(
      loginUser.password,
      user.password,
    );
    if (checkPassword) {
      const payload = { sub: user._id, infor: user };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshAccessToken = await this.jwtService.signAsync(payload, {
        expiresIn: process.env.EXPIRES_REFRESH_TOKEN_JWT,
        secret: process.env.SECRECT_JWT_REFRESH_TOKEN,
      });
      await this.userService.updateRefreshToken(user._id, refreshAccessToken);
      return {
        access_token: accessToken,
        refresh_token: refreshAccessToken,
        status: HttpStatus.ACCEPTED,
        message: 'login success',
      };
    }
    throw new HttpException('password incorrect', HttpStatus.UNAUTHORIZED);
  }
  async refreshToken(body: any, req: any) {
    try {
      const user = await this.userService.findOutRefreshToken(
        body.refreshToken,
      );
      if (!user) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          message: 'user is not valid',
        };
      }

      const payload = { sub: req.user.userId, userName: req.user.userName };
      const new_access_token = await this.jwtService.signAsync(payload);
      return {
        access_token: new_access_token,
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log('error', error.message);
    }
  }
}
