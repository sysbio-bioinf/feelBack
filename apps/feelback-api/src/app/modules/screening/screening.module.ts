import { Module } from '@nestjs/common';
import { ScreeningResolver } from './ui/graphql/resolvers/screening.resolver';
import { ScreeningService } from './services/screening.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreeningEntity } from './data/entities/screening.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScreeningEntity])],
  providers: [ScreeningResolver, ScreeningService]
})
export class ScreeningModule {}
