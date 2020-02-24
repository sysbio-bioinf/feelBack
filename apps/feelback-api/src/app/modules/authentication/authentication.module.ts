import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';

@Module({
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
