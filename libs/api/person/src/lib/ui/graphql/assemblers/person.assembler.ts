import { PersonEntity } from '@cancerlog/api/data';
import { PersonObject } from '@cancerlog/api/interfaces';
import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';

@Assembler(PersonObject, PersonEntity)
export class PersonAssembler extends ClassTransformerAssembler<
  PersonObject,
  PersonEntity
> {}
