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
}
