import { Injectable } from '@angular/core';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { TranslatableError } from '../core/customErrors/translatableError';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(private printer: Printer) {}

  async printData(data: string, options?: PrintOptions) {
    try {
      await this.printer.isAvailable().then(async (success) => {
        await this.printer.print(data, options).then(() => {
          console.log('file printed');
        });
      });
    } catch (err) {
      console.error(err);
      throw new TranslatableError('app.errors.services.printer.print');
    }
  }
}
