import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from '@feelback-app/api/data';
import { UserResolver } from './ui/graphql/resolvers/user.resolver';
import { UserDatabaseService } from './services/user-database.service';
import { UserAssemblerService } from './services/user-assembler.service';
import { UserAssembler } from './ui/graphql/assemblers/user.assembler';
import { AuthModule } from '@feelback-app/api/auth';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity]), AuthModule],
  providers: [
    UserResolver,
    UserDatabaseService,
    UserAssemblerService,
    UserAssembler,
  ],
  exports: [UserDatabaseService, UserAssemblerService, UserAssembler],
})
export class UserModule {}
