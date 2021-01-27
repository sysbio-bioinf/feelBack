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
import { TranslatableError } from '../../core/customErrors/translatableError';

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
    readonly router: Router,
    readonly toastController: ToastController,
    readonly scanner: BarcodeScanner,
    readonly cardService: CardService,
    private translatePipe: TranslatePipe,
    readonly userService: UserService,
    private platform: Platform,
  ) {
    super();
  }

  ngOnInit() {}

  async openScanner() {
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
          let errorMsg: string;
          if (err instanceof TranslatableError) {
            errorMsg = this.translatePipe.transform(err.message);
          } else {
            errorMsg = err.message;
          }
          console.error(err);
          this.toastController
            .create({
              message: err.message,
              buttons: [
                {
                  side: 'end',
                  text: this.translatePipe.transform('app.general.ok'),
                },
              ],
              duration: 5000,
            })
            .then((toast) => {
              toast.present();
            });
        });
    } else {
      this.toastController
        .create({
          message: this.translatePipe.transform(
            'app.pages.login.scanner.error',
          ),
          duration: 3000,
        })
        .then((toast) => toast.present());
    }
  }

  async login() {
    this.pseudonym = this.pseudonym.trim();

    if (!this.pseudonym || this.pseudonym.length === 0) {
      this.toastController
        .create({
          message: this.translatePipe.transform(
            'app.pages.login.pseudonymError.emptyString',
          ),
          buttons: [
            {
              side: 'end',
              text: this.translatePipe.transform('app.general.ok'),
            },
          ],
          duration: 3000,
        })
        .then((toast) => toast.present());
      return;
    }

    try {
      await this.userService.loginWithPseudonym(this.pseudonym);
      this.router.navigate(['main', 'home'], { replaceUrl: true });
    } catch (exception) {
      this.toastController
        .create({
          message: this.translatePipe.transform(
            'app.pages.login.pseudonymError.noMatch',
          ),
          buttons: [
            {
              side: 'end',
              text: this.translatePipe.transform('app.general.ok'),
            },
          ],
          duration: 3000,
        })
        .then((toast) => toast.present());
    }
  }
}
