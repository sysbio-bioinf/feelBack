import { Assembler, ClassTransformerAssembler } from '@nestjs-query/core';
import { PersonObject } from '../objects/person.object';
import { PersonEntity } from '../../../data/entities/person.entity';

@Assembler(PersonObject, PersonEntity)
export class PersonAssembler extends ClassTransformerAssembler<
  PersonObject,
  PersonEntity
> {}
