import { Resolver } from '@nestjs/graphql';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { IdentityObject } from '../../objects/identity.object';
import { IdentityService } from '../../../../services/identity.service';

@Resolver()
export class IdentityResolver extends CRUDResolver(IdentityObject) {
  constructor(readonly service: IdentityService) {
    super(service);
  }
}
