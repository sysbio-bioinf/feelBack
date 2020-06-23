import { Module } from '@nestjs/common';
import { ScreeningResolver } from './ui/graphql/resolvers/screening.resolver';
import { ScreeningDatabaseService } from './services/screening/screening-database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreeningEntity } from '@cancerlog/api/data';
import { EvaluationService } from './services/evaluation/evaluation.service';
import { ScreeningAssembler } from './ui/graphql/assemblers/screening.assembler';
import { ScreeningAssemblerService } from './services/screening/screening-assembler.service';
import { InstrumentModule } from '@cancerlog/api/instrument';
import { PersonModule } from '../person/person.module';
import { DiagramService } from './services/diagram/diagram.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScreeningEntity]),
    InstrumentModule,
    PersonModule,
  ],
  providers: [
    ScreeningResolver,
    ScreeningAssembler,
    ScreeningDatabaseService,
    ScreeningAssemblerService,
    EvaluationService,
    DiagramService,
  ],
})
export class ScreeningModule {}
