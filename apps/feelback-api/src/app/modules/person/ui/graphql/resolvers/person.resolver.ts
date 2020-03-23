import { CoreException } from '@cancerlog/api/core';
import { IdentityServiceConnection } from '@cancerlog/util/connection';
import { CreateOneInputType, CRUDResolver } from '@nestjs-query/query-graphql';
import { HttpService, HttpStatus } from '@nestjs/common';
import { Args, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { print } from 'graphql';
import { CreateOneIdentityDocument } from '../../../../../generated/feelback-identity.graphql';
import { PersonAssemblerService } from '../../../services/person/person-assembler.service';
import { PersonDatabaseService } from '../../../services/person/person-database.service';
import { CreatePersonInput } from '../inputs/create-person.input';
import { UpdatePersonInput } from '../inputs/update-person.input';
import { PersonObject } from '../objects/person.object';

@InputType()
export class CreateOnePersonInputType extends CreateOneInputType(
  PersonObject,
  CreatePersonInput,
) {}

@Resolver(of => PersonObject)
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
    private httpService: HttpService,
  ) {
    super(service);
  }

  @Mutation(() => PersonObject, { name: 'createOnePerson' })
  async createOnePerson(
    @Args('input') input: CreateOnePersonInputType,
  ): Promise<PersonObject> {
    const identityConnectionAddress = new IdentityServiceConnection().getAddress();
    const identityResponse = await this.httpService
      .post(identityConnectionAddress, {
        query: print(CreateOneIdentityDocument),
        variables: {
          pseudonym: input.input.pseudonym,
        },
      })
      .toPromise();

    if (identityResponse.data.errors) {
      // something went wrong, because we got an error back!
      throw new CoreException(
        {
          source: {
            pointer: 'feelback-identity',
          },
          detail: 'Failed to create identity',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.service.createOne(input.input);
  }

  @Query(returns => PersonObject, { nullable: true })
  async personByPseudonym(@Args('pseudonym') pseudonym: string) {
    const person = await this.personDatabaseService.repo.findOne({
      where: { pseudonym: pseudonym },
    });

    if (person.isActive !== true) {
      return null;
    }

    return this.service.assembler.convertToDTO(person);
  }
}
