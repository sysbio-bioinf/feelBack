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
import { UseGuards, InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DoctorAssemblerService } from '../../../services/doctor/doctor-assembler.service';
import { ExceptionMessageModel, EC_GENERAL_ERROR } from '@cancerlog/api/errors';

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
  enableTotalCount: true,
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
    let keycloakId;

    try {
      keycloakId = await this.keycloakService.registerDoctor({
        username: input.email,
        password: input.password,
      });
    } catch (exception) {
      throw new InternalServerErrorException({
        message:
          'Error when trying to create a new User with KeyCloak. This user already exists.',
        code: EC_GENERAL_ERROR.code,
      } as ExceptionMessageModel);
    }

    const doctorEntity = this.service.queryService.createOne({
      keycloakId: keycloakId,
      acceptedTOS: true,
      isActive: true,
    });

    return this.service.assembler.convertAsyncToDTO(doctorEntity);
  }
}
