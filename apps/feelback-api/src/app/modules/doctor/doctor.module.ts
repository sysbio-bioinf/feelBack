import { AuthModule } from '@cancerlog/api/auth';
import { DoctorEntity } from '@cancerlog/api/data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAssemblerService } from './services/doctor/doctor-assembler.service';
import { DoctorDatabaseService } from './services/doctor/doctor-database.service';
import { DoctorAssembler } from './ui/graphql/assemblers/doctor.assembler';
import { DoctorResolver } from './ui/graphql/resolvers/doctor.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity]), AuthModule],
  providers: [
    DoctorResolver,
    DoctorAssembler,
    DoctorDatabaseService,
    DoctorAssemblerService,
  ],
})
export class DoctorModule {}
