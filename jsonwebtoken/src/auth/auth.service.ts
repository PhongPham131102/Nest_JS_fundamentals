import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result['_doc'];
    }
    return null;
  }
  async login(user: User) {
    const aUser = await this.userService.findOneWithUserName(user.email);
    if (!aUser)
      throw new HttpException(
        'username or password not correct',
        HttpStatus.UNAUTHORIZED,
      );
    const payload = { sub: aUser._id, userName: user.name };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
