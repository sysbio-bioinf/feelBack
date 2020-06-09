import { CoreObject } from '@cancerlog/api/core';
import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType({
  description: 'Object that contain diagram data (x and y values)',
})
export class DiagramDataPointObject extends CoreObject {
  @Field(() => ID, {
    description: 'screening id',
    nullable: false,
  })
  screeningId!: string;

  @Field(() => GraphQLISODateTime, {
    description: 'x axis value',
    nullable: false,
  })
  x!: Date;

  @Field(() => Number, {
    description: 'calculated y axis value',
    nullable: false,
  })
  y!: number;
}
