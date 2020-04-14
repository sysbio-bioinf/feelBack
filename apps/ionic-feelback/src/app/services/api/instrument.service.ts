import { Injectable } from '@angular/core';
import { Instrument } from '@cancerlog/core/models/mobile';
import {
  GetInstrumentsGQL,
  GetInstrumentByIdGQL,
} from 'src/app/graphql/generated/feelback.graphql';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  constructor(
    private getInstrumentsService: GetInstrumentsGQL,
    private getInstrumentByIdService: GetInstrumentByIdGQL,
  ) {}

  async getAll() {
    const getInstrumentsResponse = await this.getInstrumentsService
      .fetch()
      .toPromise();
    if (getInstrumentsResponse.errors) {
      console.log('errors');
    }

    const instruments = getInstrumentsResponse.data.instruments.edges.map(
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

    return instruments;
  }

  async getById(id: string): Promise<Instrument> {
    const instrumentResponse = await this.getInstrumentByIdService
      .fetch({ id })
      .toPromise();

    const instrumentData = instrumentResponse.data.instrument;
    const instrument: Instrument = {
      id: instrumentData.id,
      name: instrumentData.name,
      description: instrumentData.description,
      image: instrumentData.image,
      type: instrumentData.type,
      payload: instrumentData.payload,
      changelog: instrumentData.changelog,
    };

    return instrument;
  }
}
