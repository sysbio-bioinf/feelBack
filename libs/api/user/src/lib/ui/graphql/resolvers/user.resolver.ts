import { CurrentUser, KeycloakService, Roles, User } from '@cancerlog/api/auth';
import { EC_GENERAL_ERROR, ExceptionMessageModel } from '@cancerlog/api/errors';
import {
  OrganizationObject,
  RegisterInput,
  RolesEnum,
  UpdateUserInput,
  UserObject,
} from '@cancerlog/api/interfaces';
import { JSONObject } from '@cancerlog/api/util';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserAssemblerService } from '../../../services/user-assembler.service';

@Resolver(() => UserObject)
export class UserResolver extends CRUDResolver(UserObject, {
  read: { disabled: false },
  create: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  update: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  delete: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
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
  async getKeycloakUserInfo(@CurrentUser() user: User) {
    return user;
  }

  @Query((returns) => UserObject, { name: 'myself' })
  @Roles(RolesEnum.MANAGER)
  async myself(@CurrentUser() user: User): Promise<UserObject> {
    return this.service.getUserByKeycloakId(user.id);
  }

  @Mutation(() => UserObject, { name: 'updateMyself' })
  @Roles(RolesEnum.MANAGER)
  async updateMyself(
    @CurrentUser() user: User,
    @Args('input') input: UpdateUserInput,
  ) {
    const currentUser = await this.service.getUserByKeycloakId(user.id);
    return this.service.updateOne(currentUser.id, input);
  }

  @Mutation(() => UserObject, { name: 'registerUser' })
  @Roles(RolesEnum.ADMIN)
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
