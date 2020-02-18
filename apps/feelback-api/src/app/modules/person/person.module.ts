import { Module, HttpModule } from '@nestjs/common';
import { PersonService } from './services/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './data/entities/person.entity';
import { PersonResolver } from './ui/graphql/resolvers/person.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity]), HttpModule],
  providers: [PersonService, PersonResolver]
})
export class PersonModule {}
