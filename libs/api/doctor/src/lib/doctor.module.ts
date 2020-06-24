import { DoctorEntity } from '@cancerlog/api/data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorAssemblerService } from './services/doctor-assembler.service';
import { DoctorDatabaseService } from './services/doctor-database.service';
import { DoctorAssembler } from './ui/graphql/assemblers/doctor.assembler';
import { DoctorResolver } from './ui/graphql/resolvers/doctor.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [
    DoctorResolver,
    DoctorAssembler,
    DoctorDatabaseService,
    DoctorAssemblerService,
  ],
  exports: [DoctorDatabaseService, DoctorAssemblerService, DoctorAssembler],
})
export class DoctorModule {}
