import { Module } from '@nestjs/common';
import { DoctorResolver } from './ui/graphql/resolvers/doctor.resolver';
import { DoctorDatabaseService } from './services/doctor/doctor-database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './data/entities/doctor.entity';
import { DoctorAssembler } from './ui/graphql/assemblers/doctor.assembler';
import { DoctorAssemblerService } from './services/doctor/doctor-assembler.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [
    DoctorResolver,
    DoctorAssembler,
    DoctorDatabaseService,
    DoctorAssemblerService,
  ],
})
export class DoctorModule {}
