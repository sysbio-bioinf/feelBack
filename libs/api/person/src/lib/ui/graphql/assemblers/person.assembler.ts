import { PersonEntity } from '@feelback-app/api/data';
import { PersonObject } from '@feelback-app/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(PersonObject, PersonEntity)
export class PersonAssembler extends ClassTransformerAssembler<
  PersonObject,
  PersonEntity
> {}
