import { CreateOneInputType } from '@nestjs-query/query-graphql';
import { InputType } from '@nestjs/graphql';
import { CreatePersonInput } from '../inputs/create-person.input';
import { PersonObject } from '../objects/person.object';

@InputType()
export class CreateOnePersonInputType extends CreateOneInputType(
  PersonObject,
  CreatePersonInput,
) {}
