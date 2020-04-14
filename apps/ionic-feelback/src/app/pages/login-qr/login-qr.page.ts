import { Component, OnInit } from '@angular/core';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { CardService } from 'src/app/services/card.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'cancerlog-login-qr',
  templateUrl: './login-qr.page.html',
  styleUrls: ['./login-qr.page.scss'],
})
export class LoginQrPage implements OnInit {
  card: any;
  pseudonym: string;

  constructor(
    private scanner: BarcodeScanner,
    private cardService: CardService,
    private translatePipe: TranslatePipe,
  ) {}

  ngOnInit() {}

  openScanner() {
    const barcodeScannerOptions: BarcodeScannerOptions = {
      prompt: this.translatePipe.transform('app.pages.login.scanner.text'),
      resultDisplayDuration: 0,
      showFlipCameraButton: false,
      showTorchButton: false,
      torchOn: false,
    };

    this.scanner
      .scan(barcodeScannerOptions)
      .then(async (scannedData) => {
        const card = this.cardService.readCard(scannedData.text);
        this.pseudonym = card.pseudonym;
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  }

  login() {
    if (!this.pseudonym || this.pseudonym.trim().length === 0) {
      console.log('error');
    }
  }
}
