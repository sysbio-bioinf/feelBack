import { Module } from '@nestjs/common';
import { ScreeningResolver } from './ui/graphql/resolvers/screening.resolver';
import { ScreeningDatabaseService } from './services/screening/screening-database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreeningEntity } from './data/entities/screening.entity';
import { EvaluationService } from './services/evaluation/evaluation.service';
import { ScreeningAssembler } from './ui/graphql/assemblers/screening.assembler';
import { ScreeningAssemblerService } from './services/screening/screening-assembler.service';
import { InstrumentModule } from '../instrument/instrument.module';

@Module({
  imports: [TypeOrmModule.forFeature([ScreeningEntity]), InstrumentModule],
  providers: [
    ScreeningResolver,
    ScreeningAssembler,
    ScreeningDatabaseService,
    ScreeningAssemblerService,
    EvaluationService,
  ],
})
export class ScreeningModule {}
