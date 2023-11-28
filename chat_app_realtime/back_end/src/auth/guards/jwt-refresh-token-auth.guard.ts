import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class jwtRTAuthGuard extends AuthGuard('jwt-refresh') {}
