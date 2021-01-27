import { Injectable } from '@angular/core';
import {
  GetInstrumentByIdGQL,
  GetInstrumentsGQL,
} from '../../graphql/generated/feelback.graphql';
import { Instrument } from '../../models/instrument.model';
import { TranslatableError } from '../../core/customErrors/translatableError';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  constructor(
    private getInstrumentsService: GetInstrumentsGQL,
    private getInstrumentByIdService: GetInstrumentByIdGQL,
  ) {}

  async getAll() {
    let getInstrumentsResponse;
    try {
      getInstrumentsResponse = await this.getInstrumentsService
        .fetch()
        .toPromise();
    } catch (err) {
      console.error(err);
      throw new TranslatableError('app.errors.services.instrument.all');
    }

    if (getInstrumentsResponse.errors) {
      throw new TranslatableError('app.errors.services.instrument.allResponse');
    }

    let instruments;
    if (getInstrumentsResponse.data) {
      instruments = getInstrumentsResponse.data.instruments.edges.map(
        (item) => {
          return {
            id: item.node.id,
            name: item.node.name,
            description: item.node.description,
            type: item.node.type,
            image: item.node.image,
            payload: item.node.payload,
            changelog: item.node.changelog,
          } as Instrument;
        },
      );
    } else {
      instruments = [];
    }
    return instruments;
  }

  async getById(id: string): Promise<Instrument> {
    let instrumentResponse;
    try {
      instrumentResponse = await this.getInstrumentByIdService
        .fetch({ id })
        .toPromise();
    } catch (err) {
      console.error(err);
      throw new TranslatableError('app.errors.services.instrument.id');
    }

    if (instrumentResponse.errors) {
      throw new TranslatableError('app.errors.services.instrument.idResponse');
    }

    let instrument: Instrument;
    if (instrumentResponse.data) {
      const instrumentData = instrumentResponse.data.instrument;
      instrument = {
        id: instrumentData.id,
        name: instrumentData.name,
        description: instrumentData.description,
        image: instrumentData.image,
        type: instrumentData.type,
        payload: instrumentData.payload,
        changelog: instrumentData.changelog,
      };
    } else {
      instrument = null;
    }

    return instrument;
  }
}
