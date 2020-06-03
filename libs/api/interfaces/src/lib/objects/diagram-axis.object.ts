import { CoreObject } from '@cancerlog/api/core';
import { ObjectType, Field } from '@nestjs/graphql';
import { DiagramDataPointObject } from './diagram-data-point.object';

@ObjectType({
  description: 'Object that contain diagram axis data',
})
export class DiagramAxisObject extends CoreObject {
  @Field({
    description: 'the name of the axis',
    nullable: false,
  })
  name!: string;

  @Field(() => [DiagramDataPointObject], {
    description: 'diagram data',
    nullable: false,
  })
  data!: DiagramDataPointObject[];
}
