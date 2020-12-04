import { DateHelper } from './date.helper';

describe('DateHelper', () => {
  describe('createUtcDate', () => {
    it("shouldn't change utc date", () => {
      const date = new Date();
      // Milliseconds are ignored in createUtcDate
      date.setMilliseconds(0);
      const utcDate = DateHelper.createUtcDate(date);
      expect(utcDate).toStrictEqual(date);
    });
  });

  describe('formatDate', () => {
    it('should format german date', () => {
      const locale = 'de';
      let date = '2020-01-15';
      let inputDate = new Date(date);
      let formattedDate = DateHelper.formatDate(inputDate, locale);
      let expectedDate = '15.01.2020';
      expect(formattedDate).toStrictEqual(expectedDate);
      date = '2020-05-02';
      inputDate = new Date(date);
      formattedDate = DateHelper.formatDate(inputDate, locale);
      expectedDate = '02.05.2020';
      expect(formattedDate).toStrictEqual(expectedDate);
      date = '2020-10-10';
      inputDate = new Date(date);
      formattedDate = DateHelper.formatDate(inputDate, locale);
      expectedDate = '10.10.2020';
      expect(formattedDate).toStrictEqual(expectedDate);
    });

    it('should format american date', () => {
      const locale = 'en';
      let date = '2020-01-15';
      let inputDate = new Date(date);
      let formattedDate = DateHelper.formatDate(inputDate, locale);
      let expectedDate = '01/15/2020';
      expect(formattedDate).toStrictEqual(expectedDate);
      date = '2020-05-02';
      inputDate = new Date(date);
      formattedDate = DateHelper.formatDate(inputDate, locale);
      expectedDate = '05/02/2020';
      expect(formattedDate).toStrictEqual(expectedDate);
      date = '2020-10-10';
      inputDate = new Date(date);
      formattedDate = DateHelper.formatDate(inputDate, locale);
      expectedDate = '10/10/2020';
      expect(formattedDate).toStrictEqual(expectedDate);
    });

    it('should not format other or invalid locales', () => {
      const date = '2020-01-15';
      const inputDate = new Date(date);
      const helper = (locale: string) =>
        DateHelper.formatDate(inputDate, locale);
      const expectedResult = 'locale not supported';
      expect(helper('invalid')).toStrictEqual(expectedResult);
      expect(helper('')).toStrictEqual(expectedResult);
    });
  });
});
