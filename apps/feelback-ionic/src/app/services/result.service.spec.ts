import { ResultService } from './result.service';

describe('ResulstService test', () => {
  let resultService: ResultService;

  let translateServiceCurrentLangEN = 'en';
  let translateServiceCurrentLangDE = 'de';

  const translateServiceMockEN = {
    currentLang: translateServiceCurrentLangEN,
    use: jest.fn((newLanguage: string) => {
      translateServiceCurrentLangEN = newLanguage;
    }),
    instant: jest.fn((key: string) => {
      if (key === 'app.components.htmlResult.birthdate') {
        return 'Date of birth';
      } else if (key === 'app.components.htmlResult.id') {
        return 'Id';
      } else if (key === 'app.components.htmlResult.question') {
        return 'Question';
      } else {
        return 'Answer';
      }
    }),
  };

  const translateServiceMockDE = {
    currentLang: translateServiceCurrentLangDE,
    use: jest.fn((newLanguage: string) => {
      translateServiceCurrentLangDE = newLanguage;
    }),
    instant: jest.fn((key: string) => {
      if (key === 'app.components.htmlResult.birthdate') {
        return 'Geburtsdatum';
      } else if (key === 'app.components.htmlResult.id') {
        return 'Id';
      } else if (key === 'app.components.htmlResult.question') {
        return 'Frage';
      } else {
        return 'Antwort';
      }
    }),
  };

  it('should generate html result text', () => {
    resultService = new ResultService(translateServiceMockEN as any);
    const plaintext = [
      { name: 'a', title: 'a.title', displayValue: 'a.displayValue' },
      { name: 'b', title: 'b.title', displayValue: '' },
      { name: 'c', title: 'c.title', displayValue: null },
      { name: 'd', title: 'd.title', displayValue: undefined },
      {
        name: '___SkipTest',
        title: 'skip.title',
        displayValue: 'skip.displayValue',
      },
    ];
    let htmlResult = resultService.generateResultText(
      plaintext,
      'mockInstrument',
    );
    console.log(htmlResult);

    expect(htmlResult).not.toMatch(/[Ss]kip/);
    expect(htmlResult).toMatch(/a.title/);
    expect(htmlResult).toMatch(/Date\sof\sbirth:/);
    expect(htmlResult).toMatch(/Question/);
    expect(htmlResult).toMatch(/Answer/);
    expect(htmlResult).toMatch(/<p>\d{0,2}\/\d{0,2}\/\d{0,4},\s/);

    // DE
    resultService = new ResultService(translateServiceMockDE as any);
    htmlResult = resultService.generateResultText(plaintext, 'mockInstrument');
    expect(htmlResult).not.toMatch(/[Ss]kip/);
    expect(htmlResult).toMatch(/a.title/);
    expect(htmlResult).toMatch(/Geburtsdatum:/);
    expect(htmlResult).toMatch(/Frage/);
    expect(htmlResult).toMatch(/Antwort/);
    expect(htmlResult).toMatch(/<p>\d{0,2}\.\d{0,2}\.\d{0,4},\s/);
    // console.log(htmlResult);

    //TODO weitere contains-tests
  });
});
