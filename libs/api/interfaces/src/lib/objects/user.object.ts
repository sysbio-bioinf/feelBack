import { JSONObject } from '@feelback-app/api/util';
import { Connection, Relation } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { DoctorObject } from './doctor.object';
import { OrganizationObject } from './organization.object';

@ObjectType('User', {
  description: 'A User (i.e, Doctor with additional information)',
})
@Connection('organizations', () => OrganizationObject, {
  nullable: true,
  disableRemove: true,
  disableUpdate: true,
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
