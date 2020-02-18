import { CreateOneArgsType, CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ArgsType } from 'type-graphql';
import { PersonService } from '../../../services/person.service';
import { CreatePersonInput } from '../inputs/create-person.input';
import { UpdatePersonInput } from '../inputs/update-person.input';
import { PersonObject } from '../objects/person.object';
import { HttpService } from '@nestjs/common';

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

  // custom CREATE method
  @Mutation(() => PersonObject, { name: 'createOnePerson' })
  async createOnePerson(
    @Args() input: CreateOnePersonArgsType
  ): Promise<PersonObject> {
    console.log('bla');

    console.log(
      await this.httpService.get('http://localhost:3001/api').toPromise()
    );

    return super.createOne(input);
  }
}
