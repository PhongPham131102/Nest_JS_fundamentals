import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStragery } from './strategies/jwt.strategy';
import { JwtStrategyRefreshToken } from './strategies/jwt-refresh-token.strategy';
@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: `121212`,
      signOptions: { expiresIn: `2m` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStragery, JwtStrategyRefreshToken],
})
export class AuthModule {}
