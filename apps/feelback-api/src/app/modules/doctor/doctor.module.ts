import { Module } from '@nestjs/common';
import { DoctorResolver } from './ui/graphql/resolvers/doctor.resolver';
import { DoctorService } from './services/doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './data/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [DoctorResolver, DoctorService]
})
export class DoctorModule {}
