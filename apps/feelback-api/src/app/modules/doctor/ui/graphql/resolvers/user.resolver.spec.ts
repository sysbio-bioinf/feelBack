import { DoctorEntity } from '@cancerlog/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorDatabaseService } from '../../../services/doctor/doctor-database.service';
import { UserAssemblerService } from '../../../services/user/user-assembler.service';
import { UserAssembler } from '../assemblers/user.assembler';
import { UserResolver } from './user.resolver';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserAssemblerService,
        DoctorDatabaseService,
        UserAssembler,
        {
          provide: getRepositoryToken(DoctorEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
