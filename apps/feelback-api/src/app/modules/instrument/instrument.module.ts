import { Module } from '@nestjs/common';
import { InstrumentDatabaseService } from './services/instrument/instrument-database.service';
import { InstrumentResolver } from './ui/graphql/resolvers/instrument.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentEntity } from '@cancerlog/api/data';
import { InstrumentAssembler } from './ui/graphql/assemblers/instrument.assembler';
import { InstrumentAssemblerService } from './services/instrument/instrument-assembler.service';

@Module({
  imports: [TypeOrmModule.forFeature([InstrumentEntity])],
  providers: [
    InstrumentResolver,
    InstrumentAssembler,
    InstrumentDatabaseService,
    InstrumentAssemblerService,
  ],
  exports: [InstrumentDatabaseService, InstrumentAssemblerService],
})
export class InstrumentModule {}
