import {
  CurrentUser,
  GqlMasterGuard,
  Roles,
  RolesEnum,
  User,
} from '@cancerlog/api/auth';
import { UserObject } from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { UserAssemblerService } from '../../../services/user/user-assembler.service';
import { JSONObject } from '@cancerlog/api/util';

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

  @Query((returns) => JSONObject, { name: 'keycloakUserInfo', nullable: true })
  @Roles(RolesEnum.USER)
  @UseGuards(GqlMasterGuard)
  keycloakUserInfo(@CurrentUser() user: User) {
    return user;
  }
}
