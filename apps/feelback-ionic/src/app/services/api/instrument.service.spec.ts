import { of } from 'rxjs';
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
    getInstrumentsGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    let instruments = await instrumentService.getAll();
    expect(instruments).toEqual([]);
    getInstrumentsGQLMock.fetch.mockReturnValueOnce(of(instrumentsMockObject));
    instruments = await instrumentService.getAll();
    expect(instruments).toEqual(instrumentResponse);
  });

  it('should get an instrument by ID', async () => {
    // getInstrumentByIdGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    // expect(instrumentService.getById('0xdummy')).rejects.toThrow(
    //   'Es ist ein Fehler aufgetreten',
    // );
    // getInstrumentByIdGQLMock.fetch.mockReturnValueOnce(of({ data: {} }));
    // expect(instrumentService.getById('0xdummy')).rejects.toThrow(
    //   'Es ist ein Fehler aufgetreten',
    // );
    getInstrumentByIdGQLMock.fetch.mockReturnValueOnce(
      of(singleInstrumentMockObject),
    );
    const faq = await instrumentService.getById('0xdummy');
    expect(faq).toEqual(singleInstrumentResponse);
  });
});
