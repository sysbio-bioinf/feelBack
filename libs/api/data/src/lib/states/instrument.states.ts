import { registerEnumType } from '@nestjs/graphql';

export enum InstrumentStatesEnum {
  DRAFT = 'draft',
  RELEASED = 'released',
  RETIRED = 'retired',
}

registerEnumType(InstrumentStatesEnum, {
  name: 'InstrumentStatesEnum',
});
