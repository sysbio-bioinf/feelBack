import { IdentifiableObject } from './identifiable.object';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from '@nestjs/graphql';

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
}
