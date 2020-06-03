import { Test, TestingModule } from '@nestjs/testing';
import { DiagramService } from './diagram.service';
import { EvaluationService } from '../evaluation/evaluation.service';

describe('DiagramService', () => {
  let service: DiagramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagramService, EvaluationService],
    }).compile();

    service = module.get<DiagramService>(DiagramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
