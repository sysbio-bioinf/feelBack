import { AuthModule } from '@feelback-app/api/auth';
import { ScreeningEntity } from '@feelback-app/api/data';
import { InstrumentModule } from '@feelback-app/api/instrument';
import { PersonModule } from '@feelback-app/api/person';
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
  exports: [
    ScreeningAssembler,
    ScreeningAssemblerService,
    ScreeningDatabaseService,
    EvaluationService,
    DiagramService,
  ],
})
export class ScreeningModule {}
