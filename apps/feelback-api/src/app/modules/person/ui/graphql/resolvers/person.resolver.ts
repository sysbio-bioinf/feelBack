import { CoreException } from '@cancerlog/api/core';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { HttpStatus } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IdentityDatabaseService } from '../../../../identity/services/identity/identity-database.service';
import { PersonAssemblerService } from '../../../services/person/person-assembler.service';
import { PersonDatabaseService } from '../../../services/person/person-database.service';
import { CreateOnePersonInputType } from '../custom.types';
import { CreatePersonInput } from '../inputs/create-person.input';
import { UpdatePersonInput } from '../inputs/update-person.input';
import { PersonObject } from '../objects/person.object';

@Resolver((of) => PersonObject)
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

  @Query((returns) => PersonObject, { nullable: true })
  async personByPseudonym(@Args('pseudonym') pseudonym: string) {
    const person = await this.personDatabaseService.getPersonByPseudonym(
      pseudonym,
    );

    if (!person) {
      return null;
    }

    if (person.isActive !== true) {
      return null;
    }

    return this.service.assembler.convertToDTO(person);
  }
}
