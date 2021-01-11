import { GuardsModule } from '@feelback-app/api/auth';
import { IdentityEntity } from '@feelback-app/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@feelback-app/api/database';
import { mockIdentityEntity } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdentityAssemblerService } from '../../../services/identity-assembler.service';
import { IdentityDatabaseService } from '../../../services/identity-database.service';
import { IdentityAssembler } from '../assemblers/identity.assembler';
import { IdentityResolver } from './identity.resolver';

const mockFindOneOrFail = jest.fn();
const mockRepository = {
  findOneOrFail: mockFindOneOrFail,
};

describe('IdentityResolver', () => {
  let resolver: IdentityResolver;
  let identityAssemblerService: IdentityAssemblerService;

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
          useValue: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<IdentityResolver>(IdentityResolver);
    identityAssemblerService = module.get<IdentityAssemblerService>(
      IdentityAssemblerService,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(identityAssemblerService).toBeDefined();
  });

  describe('identityByPseudonym', () => {
    const pseudonym = 'input pseudonym';
    const expectedOptions = {
      where: {
        pseudonym: pseudonym,
      },
    };

    it('should return identity object', async () => {
      // Set mocks
      const mockConvertToDTO = jest.fn();
      identityAssemblerService.assembler.convertToDTO = mockConvertToDTO;
      mockFindOneOrFail.mockResolvedValue(mockIdentityEntity);
      // Call method
      await resolver.identityByPseudonym(pseudonym);
      // Expect
      expect(mockFindOneOrFail).toBeCalledTimes(1);
      expect(mockFindOneOrFail).toBeCalledWith(expectedOptions);
      expect(mockConvertToDTO).toBeCalledTimes(1);
      expect(mockConvertToDTO).toBeCalledWith(mockIdentityEntity);
    });
  });
});
