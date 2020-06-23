import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { Router } from '@angular/router';
import {
  BarcodeScanner,
  BarcodeScannerOptions,
} from '@ionic-native/barcode-scanner/ngx';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { CardService } from '../../services/card.service';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'feelback-ionic-login-qrcode',
  templateUrl: './login-qrcode.page.html',
  styleUrls: ['./login-qrcode.page.scss'],
  providers: [TranslatePipe],
})
export class LoginQrcodePage extends AbstractComponent implements OnInit {
  card: any;
  pseudonym: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private scanner: BarcodeScanner,
    private cardService: CardService,
    private translatePipe: TranslatePipe,
    private userService: UserService,
    private platform: Platform,
  ) {
    super();
  }

  ngOnInit() {}

  openScanner() {
    if (this.platform.is('capacitor')) {
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
    } else {
      this.toastController
        .create({
          message:
            'Cannot use BarcodeScanner, because we are in a web environment!',
          duration: 3000,
        })
        .then((toast) => toast.present());
    }
  }

  login() {
    this.pseudonym = this.pseudonym.trim();

    if (!this.pseudonym || this.pseudonym.length === 0) {
      console.log('error');
    }

    this.userService.loginWithPseudonym(this.pseudonym);

    this.router.navigate(['main', 'home'], { replaceUrl: true });
  }
}
