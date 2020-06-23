import {
  CurrentUser,
  GqlMasterGuard,
  Roles,
  RolesEnum,
  User,
} from '@cancerlog/api/auth';
import { DoctorObject, UserObject } from '@cancerlog/api/interfaces';
import { JSONObject } from '@cancerlog/api/util';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { UserAssemblerService } from '../../../services/user-assembler.service';
import { UserDatabaseService } from '../../../services/user-database.service';

@Resolver(() => UserResolver)
export class UserResolver extends CRUDResolver(UserObject, {
  create: { disabled: true },
  delete: { disabled: true },
  update: { disabled: true }, // TODO: we need an update profile route
  read: { disabled: false },
}) {
  constructor(
    readonly service: UserAssemblerService,
    private userDatabaseService: UserDatabaseService,
  ) {
    super(service);
  }

  @Query((returns) => JSONObject, { name: 'keycloakUserInfo', nullable: true })
  @Roles(RolesEnum.USER)
  @UseGuards(GqlMasterGuard)
  async keycloakUserInfo(@CurrentUser() user: User) {
    return user;
  }

  @Query((returns) => DoctorObject, { name: 'myself' })
  @Roles(RolesEnum.MANAGER)
  @UseGuards(GqlMasterGuard)
  async myself(@CurrentUser() user: User) {
    const doctorEntity = this.userDatabaseService.getUserByKeycloakId(user.id);

    return this.service.assembler.convertAsyncToDTO(doctorEntity);
  }
}
