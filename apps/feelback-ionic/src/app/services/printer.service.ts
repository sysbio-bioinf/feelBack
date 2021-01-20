import { Injectable } from '@angular/core';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(private printer: Printer) {}

  async printData(data: string, options?: PrintOptions) {
    await this.printer.isAvailable().then(async (success) => {
      await this.printer.print(data, options).then(() => {
        console.log('file printed');
      });
    });
  }
}
