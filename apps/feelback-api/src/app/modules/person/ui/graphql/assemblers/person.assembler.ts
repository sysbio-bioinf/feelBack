import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { PersonObject } from '@cancerlog/api/interfaces';
import { PersonEntity } from '@cancerlog/api/data';

@Assembler(PersonObject, PersonEntity)
export class PersonAssembler extends ClassTransformerAssembler<
  PersonObject,
  PersonEntity
> {}
