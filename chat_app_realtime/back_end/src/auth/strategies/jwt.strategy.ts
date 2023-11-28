import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
@Injectable()
export class JwtStragery extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `121212`,
    });
  }
  async validate(payload: any) {
    const userInfor = await this.userService.findOneById(payload.sub);
    if (userInfor) return { userId: payload.sub, infor: payload.infor };
    throw new UnauthorizedException();
  }
}
