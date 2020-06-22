import {
  GqlMasterGuard,
  KeycloakService,
  Roles,
  RolesEnum,
} from '@cancerlog/api/auth';
import {
  DoctorObject,
  OrganizationObject,
  RegisterInput,
  UpdateDoctorInput,
  UserObject,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DoctorAssemblerService } from '../../../services/doctor/doctor-assembler.service';

@Resolver(() => DoctorObject)
export class DoctorResolver extends CRUDResolver(DoctorObject, {
  create: { disabled: true },
  delete: { disabled: true },
  update: { many: { disabled: true }, UpdateDTOClass: UpdateDoctorInput },
  relations: {
    many: {
      organizations: {
        DTO: OrganizationObject,
        relationName: 'organizations',
        nullable: true,
        disableRemove: true,
        disableUpdate: true,
      },
    },
  },
}) {
  constructor(
    readonly service: DoctorAssemblerService,
    private readonly keycloakService: KeycloakService,
  ) {
    super(service);
  }

  @Mutation(() => UserObject, { name: 'registerDoctor' })
  @Roles(RolesEnum.ADMIN)
  @UseGuards(GqlMasterGuard)
  async registerDoctor(@Args('input') input: RegisterInput) {
    const keycloakId = await this.keycloakService.registerDoctor({
      username: input.email,
      password: input.password,
    });

    const doctorEntity = this.service.queryService.createOne({
      keycloakId: keycloakId,
      acceptedTOS: true,
      isActive: true,
    });

    return this.service.assembler.convertAsyncToDTO(doctorEntity);
  }
}
