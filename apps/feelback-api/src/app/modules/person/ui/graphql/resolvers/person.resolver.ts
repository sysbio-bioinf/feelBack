import { CoreException } from '@cancerlog/api/core';
import {
  CreateOnePersonInputType,
  CreatePersonInput,
  PersonObject,
  UpdatePersonInput,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IdentityDatabaseService } from '../../../../identity/services/identity/identity-database.service';
import { PersonAssemblerService } from '../../../services/person/person-assembler.service';
import { PersonDatabaseService } from '../../../services/person/person-database.service';

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
      throw new CoreException(
        {
          detail: 'Failed to create a new Identity',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.service.createOne(input.input);
  }

  @Query((returns) => PersonObject)
  async personByPseudonym(@Args('pseudonym') pseudonym: string) {
    const personEntity = await this.personDatabaseService.repo.findOneOrFail({
      where: { pseudonym: pseudonym },
    });

    if (personEntity.isActive !== true) {
      throw new CoreException(
        { detail: 'Person is not active' },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return this.service.assembler.convertToDTO(personEntity);
  }
}
