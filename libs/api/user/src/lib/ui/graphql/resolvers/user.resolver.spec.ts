import { DoctorEntity } from '@feelback-app/api/data';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserAssemblerService } from '../../../services/user-assembler.service';
import { UserDatabaseService } from '../../../services/user-database.service';
import { UserAssembler } from '../assemblers/user.assembler';
import { UserResolver } from './user.resolver';
import { AuthModule } from '@feelback-app/api/auth';
import {
  ConfigModule,
  ConfigService,
  IEnvironment,
} from '@feelback-app/api/config';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('UserResolver', () => {
  // let resolver: UserResolver;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [AuthModule],
    //   providers: [
    //     ConfigService,
    //     UserResolver,
    //     UserAssemblerService,
    //     UserDatabaseService,
    //     UserAssembler,
    //     {
    //       provide: getRepositoryToken(DoctorEntity),
    //       useClass: mockRepository,
    //     },
    //   ],
    // }).compile();
    // resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    // expect(resolver).toBeDefined();
  });
});
