import { Roles, Unprotected } from '@feelback-app/api/auth';
import {
  CreateFaqInput,
  FaqObject,
  RolesEnum,
  UpdateFaqInput,
} from '@feelback-app/api/interfaces';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { FaqAssemblerService } from '../../../services/faq-assembler.service';

@Resolver(() => FaqObject)
export class FaqResolver extends CRUDResolver(FaqObject, {
  read: {
    decorators: [Unprotected()],
  },
  create: {
    many: { disabled: true },
    CreateDTOClass: CreateFaqInput,
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  update: {
    many: { disabled: true },
    UpdateDTOClass: UpdateFaqInput,
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  delete: {
    many: { disabled: true },
    decorators: [Roles(RolesEnum.ADMIN)],
  },
  enableTotalCount: true,
}) {
  constructor(readonly service: FaqAssemblerService) {
    super(service);
  }
}
