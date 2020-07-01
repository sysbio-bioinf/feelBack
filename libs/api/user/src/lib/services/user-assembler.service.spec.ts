import { DoctorEntity } from '@feelback-app/api/data';
import { mockRepository } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAssembler } from '../ui/graphql/assemblers/user.assembler';
import { UserAssemblerService } from './user-assembler.service';
import { UserDatabaseService } from './user-database.service';

describe('UserAssemblerService', () => {
  let service: UserAssemblerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAssemblerService,
        UserAssembler,
        UserDatabaseService,
        {
          provide: getRepositoryToken(DoctorEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserAssemblerService>(UserAssemblerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
