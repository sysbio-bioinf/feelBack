import { FilterableField } from '@nestjs-query/query-graphql';
import { GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { IdentifiableObject } from './identifiable.object';

@ObjectType({
  isAbstract: true,
  description: 'Core Object with ID, timestamps and version',
})
export class VersionableObject extends IdentifiableObject {
  @FilterableField({
    description:
      'The version number of this resource (incremented each time this resource was updated).',
  })
  version: number;

  @FilterableField(() => GraphQLISODateTime, {
    description: 'Date this entry was deleted.',
    nullable: true,
  })
  deletedAt?: Date;
}
