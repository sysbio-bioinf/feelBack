import { Injectable } from '@angular/core';
import {
  AttachInstrumentToScreeningGQL,
  AttachPersonToScreeningGQL,
  CreateScreeningGQL,
  CreateScreeningInput,
  UploadScreeningGQL,
} from '../../graphql/generated/feelback.graphql';
import { Instrument } from '../../models/instrument.model';
import { Person } from '../../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(
    readonly createScreeningService: CreateScreeningGQL,
    readonly attachInstrumentService: AttachInstrumentToScreeningGQL,
    readonly attachPersonService: AttachPersonToScreeningGQL,
    readonly uploadScreeningService: UploadScreeningGQL,
  ) {}

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

    const screeningResponse = await this.uploadScreeningService
      .mutate({
        screening: dto,
        instrumentId: instrument.id,
        personId: personId,
      })
      .toPromise();

    if (screeningResponse.errors) {
      throw new Error('Could not upload screening');
    }

    return true;
  }
}
