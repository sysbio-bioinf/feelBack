import {
  CreateFaqInput,
  FaqObject,
  UpdateFaqInput,
} from '@cancerlog/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { FaqAssemblerService } from '../../../services/faq-assembler.service';
import { Roles, RolesEnum, GqlMasterGuard } from '@cancerlog/api/auth';

@Resolver(() => FaqObject)
export class FaqResolver extends CRUDResolver(FaqObject, {
  create: {
    many: { disabled: true },
    CreateDTOClass: CreateFaqInput,
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdateFaqInput,
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  delete: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
    guards: [GqlMasterGuard],
  },
  enableTotalCount: true,
}) {
  constructor(readonly service: FaqAssemblerService) {
    super(service);
  }
}
