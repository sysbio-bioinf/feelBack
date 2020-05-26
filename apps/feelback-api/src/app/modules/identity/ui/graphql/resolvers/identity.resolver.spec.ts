import { Test, TestingModule } from '@nestjs/testing';
import { IdentityResolver } from './identity.resolver';
import { IdentityAssemblerService } from '../../../services/identity/identity-assembler.service';
import { IdentityDatabaseService } from '../../../services/identity/identity-database.service';
import { IdentityAssembler } from '../assemblers/identity.assembler';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdentityEntity } from '@cancerlog/api/data';
import { IDENTITY_DB_CONNECTION } from '../../../../../constants/db.constants';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('IdentityResolver', () => {
  let resolver: IdentityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentityResolver,
        IdentityAssemblerService,
        IdentityDatabaseService,
        IdentityAssembler,
        {
          provide: getRepositoryToken(IdentityEntity, IDENTITY_DB_CONNECTION),
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
