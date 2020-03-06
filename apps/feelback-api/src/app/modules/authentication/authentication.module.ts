import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationResolver } from './ui/graphql/resolvers/authentication.resolver';
import { AuthModule } from '@cancerlog/api/authentication';

@Module({
  imports: [AuthModule],
  providers: [AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
