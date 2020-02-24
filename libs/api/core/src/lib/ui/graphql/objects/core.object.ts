import { ObjectType } from 'type-graphql';

@ObjectType({
  isAbstract: true,
  description: 'Core Object for GraphQL',
})
export abstract class CoreObject {}
