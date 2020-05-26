import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqEntity } from '@cancerlog/api/data';
import { FaqAssemblerService } from './services/faq/faq-assembler.service';
import { FaqDatabaseService } from './services/faq/faq-database.service';
import { FaqAssembler } from './ui/graphql/assemblers/faq.assembler';
import { FaqResolver } from './ui/graphql/resolvers/faq.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FaqEntity])],
  providers: [
    FaqDatabaseService,
    FaqAssemblerService,
    FaqResolver,
    FaqAssembler,
  ],
  exports: [FaqDatabaseService, FaqAssemblerService],
})
export class FaqModule {}
