import { ObjectType } from '@nestjs/graphql';

@ObjectType({
  isAbstract: true,
  description: 'Core Object for GraphQL',
})
export abstract class CoreObject {}
