import { ScreeningEntity } from '@cancerlog/api/data';
import { InstrumentModule } from '@cancerlog/api/instrument';
import { PersonModule } from '@cancerlog/api/person';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagramService } from './services/diagram/diagram.service';
import { EvaluationService } from './services/evaluation/evaluation.service';
import { ScreeningAssemblerService } from './services/screening/screening-assembler.service';
import { ScreeningDatabaseService } from './services/screening/screening-database.service';
import { ScreeningAssembler } from './ui/graphql/assemblers/screening.assembler';
import { ScreeningResolver } from './ui/graphql/resolvers/screening.resolver';

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
