import { of } from 'rxjs';
import { FaqService } from './faq.service';

describe('FaqService test', () => {
  let faqService: FaqService;

  const getFaqsGQLMock = {
    fetch: jest.fn(() => of({})),
  };

  const faqsMockObject = {
    data: {
      faqs: {
        edges: [
          {
            node: {
              id: '0xdummy',
              question: 'Antwort auf alles',
              answer: '42',
              isActive: true,
            },
          },
        ],
      },
    },
  };

  const singlefaqMockObject = {
    data: {
      faq: {
        id: '0xdummy',
        question: 'Antwort auf alles',
        answer: '42',
        isActive: true,
      },
    },
  };

  const faqResponse = [
    {
      answer: '42',
      id: '0xdummy',
      isActive: true,
      question: 'Antwort auf alles',
    },
  ];

  const singlefaqResponse = faqResponse[0];

  const getFaqByIdGQLMock = {
    fetch: jest.fn(({ id: string }) => of({})),
  };

  beforeEach(() => {
    faqService = new FaqService(
      getFaqsGQLMock as any,
      getFaqByIdGQLMock as any,
    );
  });

  it('should get all FAQs', async () => {
    getFaqsGQLMock.fetch.mockReturnValueOnce(of(faqsMockObject));
    const faqs = await faqService.getAll();
    expect(faqs).toEqual(faqResponse);
    // error handling
    getFaqsGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    expect(faqService.getAll()).rejects.toThrow(
      'app.errors.services.faq.allResponse',
    );
    getFaqsGQLMock.fetch.mockImplementationOnce(() => {
      throw new Error('getAllFaq mock error');
    });
    expect(faqService.getAll()).rejects.toThrow('app.errors.services.faq.all');
  });

  it('should get a FAQ by ID', async () => {
    getFaqByIdGQLMock.fetch.mockReturnValueOnce(of({ data: {} }));
    expect(faqService.getById('0xdummy')).rejects.toThrow(
      'app.errors.services.faq.none',
    );
    getFaqByIdGQLMock.fetch.mockReturnValueOnce(of(singlefaqMockObject));
    const faq = await faqService.getById('0xdummy');
    expect(faq).toEqual(singlefaqResponse);
    // error handling
    getFaqByIdGQLMock.fetch.mockReturnValueOnce(of({ errors: 'yes' }));
    expect(faqService.getById('0xdummy')).rejects.toThrow(
      'app.errors.services.faq.idResponse',
    );
    getFaqByIdGQLMock.fetch.mockImplementationOnce((id: string) => {
      throw new Error('getFaqById mock error');
    });
    expect(faqService.getById('0xdummy')).rejects.toThrow(
      'app.errors.services.faq.id',
    );
  });
});
