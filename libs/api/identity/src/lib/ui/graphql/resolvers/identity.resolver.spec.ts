import { GuardsModule } from '@feelback-app/api/auth';
import { IdentityEntity } from '@feelback-app/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@feelback-app/api/database';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdentityAssemblerService } from '../../../services/identity-assembler.service';
import { IdentityDatabaseService } from '../../../services/identity-database.service';
import { IdentityAssembler } from '../assemblers/identity.assembler';
import { IdentityResolver } from './identity.resolver';

describe('IdentityResolver', () => {
  let resolver: IdentityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GuardsModule],
      providers: [
        IdentityResolver,
        IdentityAssemblerService,
        IdentityDatabaseService,
        IdentityAssembler,
        {
          provide: getRepositoryToken(
            IdentityEntity,
            IDENTITY_DB_CONNECTION_NAME,
          ),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<IdentityResolver>(IdentityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
