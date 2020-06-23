import {
  CurrentUser,
  GqlMasterGuard,
  KeycloakService,
  Roles,
  RolesEnum,
  User,
} from '@cancerlog/api/auth';
import { EC_GENERAL_ERROR, ExceptionMessageModel } from '@cancerlog/api/errors';
import {
  OrganizationObject,
  RegisterInput,
  UpdateUserInput,
  UserObject,
} from '@cancerlog/api/interfaces';
import { JSONObject } from '@cancerlog/api/util';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAssemblerService } from '../../../services/user-assembler.service';
import { UserDatabaseService } from '../../../services/user-database.service';
import { DeepPartial } from 'typeorm';

@Resolver(() => UserObject)
export class UserResolver extends CRUDResolver(UserObject, {
  read: { disabled: false },
  create: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  update: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  delete: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  relations: {
    many: {
      organizations: {
        DTO: OrganizationObject,
        relationName: 'organizations',
        nullable: true,
        disableRemove: true,
        disableUpdate: true,
      },
    },
  },
  enableTotalCount: true,
}) {
  constructor(
    readonly service: UserAssemblerService,
    private keycloakService: KeycloakService,
  ) {
    super(service);
  }

  @Query((returns) => JSONObject, {
    name: 'getKeycloakUserInfo',
    nullable: true,
  })
  @Roles(RolesEnum.USER)
  @UseGuards(GqlMasterGuard)
  async getKeycloakUserInfo(@CurrentUser() user: User) {
    return user;
  }

  @Query((returns) => UserObject, { name: 'myself' })
  @Roles(RolesEnum.MANAGER)
  @UseGuards(GqlMasterGuard)
  async myself(@CurrentUser() user: User): Promise<UserObject> {
    return this.service.getUserByKeycloakId(user.id);
  }

  @Mutation(() => UserObject, { name: 'updateMyself' })
  @Roles(RolesEnum.MANAGER)
  @UseGuards(GqlMasterGuard)
  async updateMyself(
    @CurrentUser() user: User,
    @Args('input') input: UpdateUserInput,
  ) {
    const currentUser = await this.service.getUserByKeycloakId(user.id);
    return this.service.updateOne(currentUser.id, input);
  }

  @Mutation(() => UserObject, { name: 'registerUser' })
  @Roles(RolesEnum.ADMIN)
  @UseGuards(GqlMasterGuard)
  async registerUser(@Args('input') input: RegisterInput) {
    let keycloakId;

    try {
      keycloakId = await this.keycloakService.registerDoctor({
        username: input.email,
        password: input.password,
      });
    } catch (exception) {
      throw new InternalServerErrorException({
        message:
          'Error when trying to create a new User with KeyCloak. This user already exists.',
        code: EC_GENERAL_ERROR.code,
      } as ExceptionMessageModel);
    }

    const doctorEntity = this.service.queryService.createOne({
      keycloakId: keycloakId,
      acceptedTOS: true,
      isActive: true,
    });

    return this.service.assembler.convertAsyncToDTO(doctorEntity);
  }
}
