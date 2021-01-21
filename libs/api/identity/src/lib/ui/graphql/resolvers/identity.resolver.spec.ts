import { GuardsModule } from '@feelback-app/api/auth';
import { IdentityEntity } from '@feelback-app/api/data';
import { IDENTITY_DB_CONNECTION_NAME } from '@feelback-app/api/database';
import { IdentityObject } from '@feelback-app/api/interfaces';
import { mockIdentityEntity } from '@feelback-app/api/testing';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IdentityAssemblerService } from '../../../services/identity-assembler.service';
import { IdentityDatabaseService } from '../../../services/identity-database.service';
import { IdentityAssembler } from '../assemblers/identity.assembler';
import { IdentityResolver } from './identity.resolver';

const mockFindOneOrFail: jest.Mock<Promise<IdentityEntity>> = jest.fn();
const mockRepository = {
  findOneOrFail: mockFindOneOrFail,
};

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
          useValue: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<IdentityResolver>(IdentityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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
      mockFindOneOrFail.mockResolvedValue(mockIdentityEntity);
      // Call method
      const result = await resolver.identityByPseudonym(pseudonym);
      // Expect
      expect(result).toBeInstanceOf(IdentityObject);
      expect(result).toMatchObject<IdentityObject>({ ...mockIdentityEntity });
      expect(mockFindOneOrFail).toBeCalledTimes(1);
      expect(mockFindOneOrFail).toBeCalledWith(expectedOptions);
    });
  });
});
