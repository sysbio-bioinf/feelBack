import { CoreObject } from '@cancerlog/api/core';
import { ObjectType, Field } from '@nestjs/graphql';
import { DiagramAxisObject } from './diagram-axis.object';

@ObjectType({
  description: 'Object that contain diagram data information',
})
export class DiagramDataObject extends CoreObject {
  @Field(() => String, {
    description: 'the name of the diagram',
    nullable: false,
  })
  name!: string;

  @Field(() => String, {
    description: 'the type of the diagram',
    nullable: false,
  })
  type!: string;

  @Field(() => [DiagramAxisObject], {
    description: 'diagram axis information',
    nullable: false,
  })
  axis!: DiagramAxisObject[];
}
