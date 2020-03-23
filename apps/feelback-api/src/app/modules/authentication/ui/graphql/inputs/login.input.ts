import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CoreInput } from '@cancerlog/api/core';

@InputType({ description: 'Credentials to login' })
export class LoginInput extends CoreInput {
  @IsEmail()
  @IsNotEmpty()
  @Field({ description: 'The email to login with' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Field({ description: 'The password to login with' })
  password: string;
}
