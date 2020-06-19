import { JSONObject } from '@cancerlog/api/util';
import { Field, ObjectType } from '@nestjs/graphql';
import { DoctorObject } from './doctor.object';

@ObjectType('User', {
  description: 'A User (i.e, Doctor with additional information)',
})
export class UserObject extends DoctorObject {
  @Field(() => String, {
    description: 'The Keycloak ID of this User',
    nullable: true,
  })
  keycloakId!: string | null;

  @Field(() => JSONObject, {
    description: 'Settings for this user',
    nullable: false,
  })
  settings!: object;
}
