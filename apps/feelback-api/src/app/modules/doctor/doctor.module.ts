import { DoctorEntity } from '@cancerlog/api/data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAssemblerService } from './services/doctor/doctor-assembler.service';
import { DoctorDatabaseService } from './services/doctor/doctor-database.service';
import { UserAssemblerService } from './services/user/user-assembler.service';
import { DoctorAssembler } from './ui/graphql/assemblers/doctor.assembler';
import { UserAssembler } from './ui/graphql/assemblers/user.assembler';
import { DoctorResolver } from './ui/graphql/resolvers/doctor.resolver';
import { UserResolver } from './ui/graphql/resolvers/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [
    DoctorResolver,
    DoctorAssembler,
    DoctorDatabaseService,
    DoctorAssemblerService,
    UserResolver,
    UserAssembler,
    UserAssemblerService,
  ],
})
export class DoctorModule {}
