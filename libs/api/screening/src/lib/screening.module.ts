import { AuthModule } from '@cancerlog/api/auth';
import { ScreeningEntity } from '@cancerlog/api/data';
import { InstrumentModule } from '@cancerlog/api/instrument';
import { PersonModule } from '@cancerlog/api/person';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagramService } from './services/diagram.service';
import { EvaluationService } from './services/evaluation.service';
import { ScreeningAssemblerService } from './services/screening-assembler.service';
import { ScreeningDatabaseService } from './services/screening-database.service';
import { ScreeningAssembler } from './ui/graphql/assemblers/screening.assembler';
import { ScreeningResolver } from './ui/graphql/resolvers/screening.resolver';

@Module({
  imports: [
    AuthModule,
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
  exports: [],
})
export class ScreeningModule {}
