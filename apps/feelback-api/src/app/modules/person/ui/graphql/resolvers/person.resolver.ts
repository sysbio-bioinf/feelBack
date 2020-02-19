import { CreateOneArgsType, CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ArgsType } from 'type-graphql';
import { PersonService } from '../../../services/person.service';
import { CreatePersonInput } from '../inputs/create-person.input';
import { UpdatePersonInput } from '../inputs/update-person.input';
import { PersonObject } from '../objects/person.object';
import { HttpService, InternalServerErrorException } from '@nestjs/common';
import { print } from 'graphql';
import { CreateOneIdentityDocument } from '../../../../../generated/feelback-identity.graphql';

@ArgsType()
export class CreateOnePersonArgsType extends CreateOneArgsType(
  CreatePersonInput
) {}

@Resolver(of => PersonObject)
export class PersonResolver extends CRUDResolver(PersonObject, {
  create: {
    many: { disabled: true },
    one: { disabled: true },
    CreateDTOClass: CreatePersonInput
  },
  delete: { disabled: true },
  update: { many: { disabled: true }, UpdateDTOClass: UpdatePersonInput }
}) {
  constructor(
    readonly service: PersonService,
    private httpService: HttpService
  ) {
    super(service);
  }

  @Mutation(() => PersonObject, { name: 'createOnePerson' })
  async createOnePerson(
    @Args() input: CreateOnePersonArgsType
  ): Promise<PersonObject> {
    const identityResponse = await this.httpService
      .post('http://localhost:3001/graphql', {
        query: print(CreateOneIdentityDocument),
        variables: {
          pseudonym: input.input.pseudonym
        }
      })
      .toPromise();

    if (identityResponse.data.errors) {
      // something went wrong, because we got an error back!
      throw new InternalServerErrorException({
        service: 'feelback-identity',
        message: 'Failed to create identity'
      });
    }

    return super.createOne(input);
  }
}
