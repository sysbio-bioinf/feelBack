import { of } from 'rxjs';
import { ScreeningService } from './screening.service';
import {
  CreateScreeningInput,
  Person,
} from '../../graphql/generated/feelback.graphql';
import { Instrument } from '../../models/instrument.model';

describe('ScreeningService test', () => {
  let screeningService: ScreeningService;

  const screeningInputMock: CreateScreeningInput = {
    collectedAt: new Date(),
    instanceId: 'InstanceId',
    language: 'Language',
    payload: 'Payload',
  };

  const instrumentMock: Instrument = {
    id: 'InstrumentID',
    name: 'InstrumentName',
    description: 'InstrumentDescription',
    type: 'InstrumentType',
    payload: {
      entry: 'Payload',
    },
  };

  const personMock: Person = {
    id: 'personID',
    pseudonym: 'pseudoMock',
    acceptedTOS: true,
    version: 1,
    createdAt: '01.01.01',
    updatedAt: '02.02.02',
  };

  const createScreeningGQLMock = {};
  const attachInstrumentToScreeningGQLMock = {};
  const attachPersonToScreeningGQLMock = {};
  const uploadScreeningGQLMock = {
    mutate: jest.fn(({}) => of({})),
  };

  beforeEach(() => {
    screeningService = new ScreeningService(
      createScreeningGQLMock as any,
      attachInstrumentToScreeningGQLMock as any,
      attachPersonToScreeningGQLMock as any,
      uploadScreeningGQLMock as any,
    );
  });

  it('should upload a screening', async () => {
    uploadScreeningGQLMock.mutate.mockReturnValueOnce(
      of({
        screening: screeningInputMock,
        instrumentId: instrumentMock.id,
        personId: personMock.id,
      }),
    );
    const uploadResult = await screeningService.uploadScreening(
      screeningInputMock,
      instrumentMock,
      personMock,
    );
    expect(uploadResult).toBe(true);
    // error handling
    uploadScreeningGQLMock.mutate.mockReturnValueOnce(
      of({
        errors: 'yes',
      }),
    );
    expect(
      screeningService.uploadScreening(screeningInputMock, instrumentMock),
    ).rejects.toThrow('app.errors.services.screening.response');
    uploadScreeningGQLMock.mutate.mockImplementationOnce(({}) => {
      throw new Error('Upload Screening errors');
    });
    expect(
      screeningService.uploadScreening(screeningInputMock, instrumentMock),
    ).rejects.toThrow('app.errors.services.screening.upload');
  });
});
