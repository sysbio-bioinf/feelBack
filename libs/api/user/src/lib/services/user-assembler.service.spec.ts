import { DoctorEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAssemblerService } from './user-assembler.service';
import { UserDatabaseService } from './user-database.service';
import { UserAssembler } from '../ui/graphql/assemblers/user.assembler';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

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
