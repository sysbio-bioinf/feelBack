import { FaqEntity } from '@cancerlog/api/data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqAssemblerService } from './services/faq-assembler.service';
import { FaqDatabaseService } from './services/faq-database.service';
import { FaqAssembler } from './ui/graphql/assemblers/faq.assembler';
import { FaqResolver } from './ui/graphql/resolvers/faq.resolver';
import { AuthModule } from '@cancerlog/api/auth';

@Module({
  imports: [TypeOrmModule.forFeature([FaqEntity])],
  providers: [
    FaqDatabaseService,
    FaqAssemblerService,
    FaqResolver,
    FaqAssembler,
  ],
  exports: [FaqDatabaseService, FaqAssemblerService, FaqAssembler],
})
export class FaqModule {}
