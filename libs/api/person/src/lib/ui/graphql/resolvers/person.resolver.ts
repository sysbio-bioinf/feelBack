import { Roles, Unprotected } from '@feelback-app/api/auth';
import {
  EC_GENERAL_ERROR,
  ExceptionMessageModel,
} from '@feelback-app/api/errors';
import { IdentityDatabaseService } from '@feelback-app/api/identity';
import {
  CreateOnePersonInputType,
  CreatePersonInput,
  PersonObject,
  UpdatePersonInput,
} from '@feelback-app/api/interfaces';
import { RolesEnum } from '@feelback-app/api/shared';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PersonAssemblerService } from '../../../services/person-assembler.service';
import { PersonDatabaseService } from '../../../services/person-database.service';

@Resolver(() => PersonObject)
export class PersonResolver extends CRUDResolver(PersonObject, {
  read: {
    many: {
      decorators: [Roles(RolesEnum.ADMIN)],
    },
    one: {
      decorators: [Unprotected()],
    },
  },
  create: {
    many: { disabled: true },
    one: { disabled: true },
    CreateDTOClass: CreatePersonInput,
    CreateOneInput: CreateOnePersonInputType,
  },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdatePersonInput,
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  delete: { disabled: true },
  enableTotalCount: true,
}) {
  constructor(
    readonly service: PersonAssemblerService,
    readonly personDatabaseService: PersonDatabaseService,
    readonly identityDatabaseService: IdentityDatabaseService,
  ) {
    super(service);
  }

  @Mutation(() => PersonObject, { name: 'createOnePerson' })
  @Roles(RolesEnum.ADMIN)
  async createOnePerson(
    @Args('input') input: CreateOnePersonInputType,
  ): Promise<PersonObject> {
    const identity = await this.identityDatabaseService.createOne({
      pseudonym: input.input.pseudonym,
    });

    if (!identity) {
      throw new InternalServerErrorException({
        code: EC_GENERAL_ERROR.code,
        title: 'Unauthorized',
        message: 'Account not verified',
      } as ExceptionMessageModel);
    }

    return this.service.createOne(input.input);
  }

  @Query((returns) => PersonObject)
  @Unprotected()
  async personByPseudonym(@Args('pseudonym') pseudonym: string) {
    const personEntity = await this.personDatabaseService.repo.findOneOrFail({
      where: { pseudonym: pseudonym },
    });

    if (personEntity.isActive !== true) {
      throw new ConflictException({
        code: EC_GENERAL_ERROR.code,
        title: 'Conflict',
        message: 'The requested Person is not active',
      } as ExceptionMessageModel);
    }

    return this.service.assembler.convertToDTO(personEntity);
  }
}
