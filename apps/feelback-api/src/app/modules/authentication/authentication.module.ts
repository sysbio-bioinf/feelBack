import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationResolver } from './ui/graphql/resolvers/authentication.resolver';
import { AuthModule } from '@cancerlog/api/authentication';
import { KeycloakStrategy } from './strategies/keycloak.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from '../doctor/data/entities/doctor.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([DoctorEntity])],
  providers: [KeycloakStrategy, AuthenticationService, AuthenticationResolver],
})
export class AuthenticationModule {}
