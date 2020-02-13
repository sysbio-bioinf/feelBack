import { IdentifiableObject } from './identifiable.object';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from 'type-graphql';

@ObjectType({
  isAbstract: true,
  description: 'Core Object with ID, timestamps and version'
})
export class VersionableObject extends IdentifiableObject {
  @FilterableField({
    description:
      'The version number of this resource (incremented each time this resource was updated).'
  })
  version: number;
}
