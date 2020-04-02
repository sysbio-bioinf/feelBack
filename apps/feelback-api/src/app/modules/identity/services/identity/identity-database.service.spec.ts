import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdentityEntity } from '../../data/entities/identity.entity';
import { IdentityDatabaseService } from './identity-database.service';
import { IDENTITY_DB_CONNECTION } from '../../../../constants/db.constants';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('IdentityDatabaseService', () => {
  let service: IdentityDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentityDatabaseService,
        {
          provide: getRepositoryToken(IdentityEntity, IDENTITY_DB_CONNECTION),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<IdentityDatabaseService>(IdentityDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
