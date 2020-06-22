import { LoginInput } from './login.input';
import { InputType } from '@nestjs/graphql';

@InputType({ description: 'Credentials to be registered' })
export class RegisterInput extends LoginInput {}
