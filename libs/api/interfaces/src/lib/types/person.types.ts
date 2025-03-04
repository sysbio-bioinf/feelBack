import { CreateOneInputType } from '@nestjs-query/query-graphql';
import { InputType } from '@nestjs/graphql';
import { CreatePersonInput } from '../inputs/create-person.input';

@InputType()
export class CreateOnePersonInputType extends CreateOneInputType(
  'person',
  CreatePersonInput,
) {}
