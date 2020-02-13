import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningResolver } from './screening/screening.resolver';

describe('ScreeningResolver', () => {
  let resolver: ScreeningResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningResolver]
    }).compile();

    resolver = module.get<ScreeningResolver>(ScreeningResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
