import { Injectable } from '@angular/core';
import {
  CreateScreeningInput,
  UploadScreeningGQL,
} from '../../graphql/generated/feelback.graphql';
import { Instrument } from '../../models/instrument.model';
import { Person } from '../../models/person.model';
import { TranslatableError } from '../../core/customErrors/translatableError';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(private readonly uploadScreeningService: UploadScreeningGQL) {}

  async uploadScreening(
    screening: CreateScreeningInput,
    instrument: Instrument,
    person?: Person,
  ): Promise<boolean> {
    const dto: CreateScreeningInput = {
      collectedAt: screening.collectedAt.toISOString(),
      instanceId: screening.instanceId,
      language: screening.language,
      payload: screening.payload,
      userAgent: screening.userAgent,
    };

    let personId = null;
    if (person) {
      personId = person.id;
    }

    let screeningResponse;
    try {
      screeningResponse = await this.uploadScreeningService
        .mutate({
          screening: dto,
          instrumentId: instrument.id,
          personId: personId,
        })
        .toPromise();
    } catch (err) {
      console.error(err);
      throw new TranslatableError('app.errors.services.screening.upload');
    }

    if (screeningResponse.errors) {
      throw new TranslatableError('app.errors.services.screening.upload');
    }

    return true;
  }
}
