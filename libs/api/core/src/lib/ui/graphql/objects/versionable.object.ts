import { IdentifiableObject } from './identifiable.object';
import { FilterableField } from '@nestjs-query/query-graphql';

export class VersionableObject extends IdentifiableObject {
  @FilterableField()
  version: number;
}
