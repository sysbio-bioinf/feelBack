import { CoreObject } from './core.object';
import { ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType({
  isAbstract: true,
  description:
    'Core Object with ID and timestamps for creating and updating resources',
})
export abstract class IdentifiableObject extends CoreObject {
  @FilterableField(() => ID, {
    description: 'The ID of this resource.',
  })
  id: string;

  @FilterableField(() => GraphQLISODateTime, {
    description: 'DateTime when this resource was created.',
  })
  createdAt: Date;

  @FilterableField(() => GraphQLISODateTime, {
    description: 'DateTime when this resource was last updated.',
  })
  updatedAt: Date;
}
