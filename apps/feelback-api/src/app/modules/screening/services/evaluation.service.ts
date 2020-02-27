import { Injectable } from '@nestjs/common';
import { InstrumentEntity } from '../../instrument/data/entities/instrument.entity';
import { ScreeningEntity } from '../data/entities/screening.entity';

@Injectable()
export class EvaluationService {
  constructor() {}

  evaluate(screening: ScreeningEntity, instrument: InstrumentEntity) {}
}
