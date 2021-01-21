import * as dayjs from 'dayjs';

export class DateHelper {
  public static createUtcDate(date: Date): Date {
    const utc_date = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
    return new Date(utc_date);
  }

  public static formatDate(date: Date, locale: string): string {
    switch (locale) {
      case 'de':
        return dayjs(date).format('DD.MM.YYYY');
      case 'en':
        return dayjs(date).format('MM/DD/YYYY');
      default:
        return 'locale not supported';
    }
  }
}
