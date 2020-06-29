import { InstrumentEntity } from '@feelback-app/api/data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentAssemblerService } from './services/instrument-assembler.service';
import { InstrumentDatabaseService } from './services/instrument-database.service';
import { InstrumentAssembler } from './ui/graphql/assemblers/instrument.assembler';
import { InstrumentResolver } from './ui/graphql/resolvers/instrument.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([InstrumentEntity])],
  providers: [
    InstrumentResolver,
    InstrumentAssembler,
    InstrumentDatabaseService,
    InstrumentAssemblerService,
  ],
  exports: [
    InstrumentDatabaseService,
    InstrumentAssemblerService,
    InstrumentAssembler,
  ],
})
export class InstrumentModule {}
