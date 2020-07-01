import { IdentityEntity } from '@feelback-app/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@feelback-app/api/database';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdentityDatabaseService } from './identity-database.service';

describe('IdentityDatabaseService', () => {
  let service: IdentityDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdentityDatabaseService,
        {
          provide: getRepositoryToken(
            IdentityEntity,
            IDENTITY_DB_CONNECTION_NAME,
          ),
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
