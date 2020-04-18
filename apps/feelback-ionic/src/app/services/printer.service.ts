import { Injectable } from '@angular/core';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  constructor(private printer: Printer) {}

  printData(data: string, options?: PrintOptions) {
    this.printer
      .isAvailable()
      .then((success) => {
        this.printer.print(data, options).then(() => {
          console.log('file printed');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
