import { UserObject } from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Query, Resolver } from '@nestjs/graphql';
import { UserAssemblerService } from '../../../services/user/user-assembler.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@cancerlog/api/auth';

@Resolver(() => UserResolver)
export class UserResolver extends CRUDResolver(UserObject, {
  create: { disabled: true },
  delete: { disabled: true },
  update: { disabled: true }, // TODO: we need an update profile route
  read: { disabled: false },
}) {
  constructor(readonly service: UserAssemblerService) {
    super(service);
  }

  @Query((returns) => String, { name: 'getMyProfile', nullable: true })
  @UseGuards(GqlAuthGuard)
  getMyProfile() {
    return 'hallo';
  }
}
