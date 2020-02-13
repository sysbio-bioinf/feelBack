import { Module } from '@nestjs/common';
import { InstrumentService } from './services/instrument.service';
import { InstrumentResolver } from './ui/graphql/resolvers/instrument.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentEntity } from './data/entities/instrument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstrumentEntity])],
  providers: [InstrumentService, InstrumentResolver]
})
export class InstrumentModule {}
