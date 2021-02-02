import { of } from 'rxjs';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { InstrumentService } from './instrument.service';

describe('InstrumentService test', () => {
  let instrumentService: InstrumentService;

  const instrumentsMockObject = {
    data: {
      instruments: {
        edges: [
          {
            node: {
              id: '0xdummy',
              name: 'Name',
              description: 'Description',
              type: 'Type',
              image: 'Image',
              payload: 'Payload',
              changelog: 'Changelog',
            },
          },
        ],
      },
    },
  };

  const singleInstrumentMockObject = {
    data: {
      instrument: {
        id: '0xdummy',
        name: 'Name',
        description: 'Description',
        type: 'Type',
        image: 'Image',
        payload: 'Payload',
        changelog: 'Changelog',
      },
    },
  };

  const instrumentResponse = [
    {
      id: '0xdummy',
      name: 'Name',
      description: 'Description',
      type: 'Type',
      image: 'Image',
      payload: 'Payload',
      changelog: 'Changelog',
    },
  ];

  const singleInstrumentResponse = instrumentResponse[0];

  const getInstrumentsGQLMock = {
    fetch: jest.fn(() => of({})),
  };

  const getInstrumentByIdGQLMock = {
    fetch: jest.fn(({ id: string }) => of({})),
  };

  beforeEach(() => {
    instrumentService = new InstrumentService(
      getInstrumentsGQLMock as any,
      getInstrumentByIdGQLMock as any,
    );
  });

  it('should get all instruments', async () => {
    getInstrumentsGQLMock.fetch.mockReturnValueOnce(of(instrumentsMockObject));
    let instruments = await instrumentService.getAll();
    expect(instruments).toEqual(instrumentResponse);
    // error handling
    getInstrumentsGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    instruments = [];
    let error;
    try {
      instruments = await instrumentService.getAll();
    } catch (e) {
      error = e;
    }
    expect(error.name).toEqual('TranslatableError');
    expect(error.message).toEqual('app.errors.services.instrument.allResponse');
    expect(instruments).toEqual([]);
    instruments = null;
    error = null;
    getInstrumentsGQLMock.fetch.mockReturnValueOnce(of({ data: {} }));
    try {
      instruments = await instrumentService.getAll();
    } catch (e) {
      error = e;
    }
    expect(error).toBe(null);
    expect(instruments).toEqual([]);
    getInstrumentsGQLMock.fetch.mockImplementationOnce(() => {
      throw new Error('getAllInstruments mock error');
    });
    expect(instrumentService.getAll()).rejects.toThrow(
      'app.errors.services.instrument.all',
    );
  });

  it('should get an instrument by ID', async () => {
    let instrument;
    let error;
    getInstrumentByIdGQLMock.fetch.mockReturnValueOnce(
      of(singleInstrumentMockObject),
    );
    try {
      instrument = await instrumentService.getById('0xdummy');
    } catch (e) {
      error = e;
    }
    expect(instrument).toEqual(singleInstrumentResponse);
    expect(error).toBeUndefined();
    // error handling
    getInstrumentByIdGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    try {
      instrument = await instrumentService.getById('0xdummy');
    } catch (e) {
      error = e;
    }
    expect(error instanceof TranslatableError).toEqual(true);
    expect(error.message).toEqual('app.errors.services.instrument.idResponse');
    getInstrumentByIdGQLMock.fetch.mockReturnValueOnce(of({ data: {} }));
    error = undefined;
    try {
      instrument = await instrumentService.getById('0xdummy');
    } catch (e) {
      error = e;
    }
    expect(error).toBeUndefined();
    expect(instrument).toEqual(null);
    getInstrumentByIdGQLMock.fetch.mockImplementationOnce((id: string) => {
      throw new Error('getInstrumentById mock error');
    });
    expect(instrumentService.getById('0xdummy')).rejects.toThrow(
      'app.errors.services.instrument.id',
    );
  });
});
