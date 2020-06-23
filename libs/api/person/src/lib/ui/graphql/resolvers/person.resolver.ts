import { EC_GENERAL_ERROR, ExceptionMessageModel } from '@cancerlog/api/errors';
import { IdentityDatabaseService } from '@cancerlog/api/identity';
import {
  CreateOnePersonInputType,
  CreatePersonInput,
  PersonObject,
  UpdatePersonInput,
} from '@cancerlog/api/interfaces';
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
  create: {
    many: { disabled: true },
    one: { disabled: true },
    CreateDTOClass: CreatePersonInput,
    CreateOneInput: CreateOnePersonInputType,
  },
  delete: { disabled: true },
  update: { many: { disabled: true }, UpdateDTOClass: UpdatePersonInput },
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
