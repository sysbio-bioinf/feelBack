import { IdentifiableObject } from './identifiable.object';
import { FilterableField } from '@nestjs-query/query-graphql';
import { ObjectType } from 'type-graphql';

@ObjectType({
  isAbstract: true
})
export class VersionableObject extends IdentifiableObject {
  @FilterableField()
  version: number;
}
