import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdentityEntity } from '@cancerlog/api/data';
import { IdentityAssembler } from '../../ui/graphql/assemblers/identity.assembler';
import { IdentityAssemblerService } from './identity-assembler.service';
import { IdentityDatabaseService } from './identity-database.service';
import { IDENTITY_DB_CONNECTION } from '../../../../constants/db.constants';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('IdentityAssemblerService', () => {
  let service: IdentityAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentityAssemblerService,
        IdentityAssembler,
        IdentityDatabaseService,
        {
          provide: getRepositoryToken(IdentityEntity, IDENTITY_DB_CONNECTION),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<IdentityAssemblerService>(IdentityAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
