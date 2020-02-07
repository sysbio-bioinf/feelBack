import { CoreObject } from './core.object';
import { ID, GraphQLISODateTime } from 'type-graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

export abstract class IdentifiableObject extends CoreObject {
  @FilterableField(() => ID)
  id: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;
}
