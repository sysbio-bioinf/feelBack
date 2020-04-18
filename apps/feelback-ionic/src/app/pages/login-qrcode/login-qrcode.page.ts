import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { Router } from '@angular/router';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'feelback-login-qrcode',
  templateUrl: './login-qrcode.page.html',
  styleUrls: ['./login-qrcode.page.scss'],
  providers: [TranslatePipe],
})
export class LoginQrcodePage extends AbstractComponent implements OnInit {
  card: any;
  pseudonym: string;

  constructor(
    private router: Router,
    private scanner: BarcodeScanner,
    private cardService: CardService,
    private translatePipe: TranslatePipe,
    private userService: UserService,
  ) {
    super();
  }

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
    this.pseudonym = this.pseudonym.trim();

    if (!this.pseudonym || this.pseudonym.length === 0) {
      console.log('error');
    }

    this.userService.loginWithPseudonym(this.pseudonym);

    this.router.navigate(['main', 'home']);
  }
}
