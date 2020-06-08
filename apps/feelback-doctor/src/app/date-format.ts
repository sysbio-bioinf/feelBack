import { Platform } from '@angular/cdk/platform';
import * as dayjs from 'dayjs';
import 'dayjs/locale/de';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import { NativeDateAdapter } from '@angular/material/core';


export const AppDateFormats = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

export class AppDateAdapter extends NativeDateAdapter {

  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform)

    dayjs.locale('de')
    dayjs.extend(customParseFormat)
    dayjs.extend(localizedFormat)
  }

  parse(value: any): Date | null {
    return dayjs(value, 'DD.MM.YYYY').toDate()
  }

  format(date: Date, displayFormat: any): string {
    return dayjs(date).format(displayFormat)
  }

}