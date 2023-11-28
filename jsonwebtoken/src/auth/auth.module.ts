import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserChema } from 'src/user/schema/user.schema';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken';
@Module({
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    LocalStrategy,
    RefreshJwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserChema }]),
    JwtModule.register({
      secret: `${process.env.ACCESS_TOKEN_SECERT}`,
      signOptions: { expiresIn: '60d' },
    }),
  ],
})
export class AuthModule {}
