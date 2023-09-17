import { Module } from '@nestjs/common';
//import { MongooseModule} from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { AuthSchema} from './schemas/auth.schemas';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { ModuleRef } from '@nestjs/core';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
