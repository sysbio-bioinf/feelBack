import { Injectable } from '@angular/core';
import {
  AttachInstrumentToScreeningGQL,
  AttachPersonToScreeningGQL,
  CreateScreeningGQL,
  CreateScreeningInput,
} from 'src/app/graphql/generated/feelback.graphql';
import { Instrument } from 'src/app/models/instrument.model';
import { Person } from 'src/app/models/person.model';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(
    readonly createScreeningService: CreateScreeningGQL,
    readonly attachInstrumentService: AttachInstrumentToScreeningGQL,
    readonly attachPersonService: AttachPersonToScreeningGQL,
  ) {}

  async uploadScreening(
    screening: CreateScreeningInput,
    person: Person,
    instrument: Instrument,
  ): Promise<boolean> {
    const dto: CreateScreeningInput = {
      collectedAt: screening.collectedAt.toISOString(),
      instanceId: screening.instanceId,
      language: screening.language,
      payload: screening.payload,
      userAgent: screening.userAgent,
    };

    const screeningResponse = await this.createScreeningService
      .mutate({ data: dto })
      .toPromise();
    if (screeningResponse.errors) {
      throw new Error('Screening konnte nicht hochgeladen werden');
    }

    const screeningId = screeningResponse.data.createOneScreening.id;

    if (instrument) {
      const attachInstrumentResponse = await this.attachInstrumentService
        .mutate({
          screeningId,
          instrumentId: instrument.id,
        })
        .toPromise();
    }

    if (person) {
      const attachPersonResponse = await this.attachPersonService
        .mutate({
          screeningId,
          personId: person.id,
        })
        .toPromise();
    }

    return true;
  }
}
