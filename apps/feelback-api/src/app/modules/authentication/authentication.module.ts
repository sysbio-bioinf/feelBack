import { DoctorEntity } from '@cancerlog/api/data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationService } from './services/authentication.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
