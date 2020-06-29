import { CoreInput } from '@feelback-app/api/core';
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';

@InputType({
  description: 'Update an Identity',
})
export class UpdateIdentityInput extends CoreInput {
  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The (new) title of this identity',
    nullable: true,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The (new) firstname',
    nullable: true,
  })
  firstname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(190)
  @Field({
    description: 'The (new) lastname',
    nullable: true,
  })
  lastname?: string;
}
