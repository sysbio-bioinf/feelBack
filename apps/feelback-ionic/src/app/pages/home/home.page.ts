import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { Instrument } from '../../models/instrument.model';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { InstrumentService } from '../../services/api/instrument.service';
import { TranslatableError } from '../../core/customErrors/translatableError';

@Component({
  selector: 'feelback-ionic-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [TranslatePipe],
})
export class HomePage extends AbstractComponent {
  instruments: Instrument[] = [];
  loading: HTMLIonLoadingElement;
  loaded = false;

  constructor(
    readonly router: Router,
    readonly loadingController: LoadingController,
    readonly instrumentService: InstrumentService,
    readonly translatePipe: TranslatePipe,
    private toastController: ToastController,
  ) {
    super();
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    try {
      this.instruments = await this.instrumentService.getAll();
    } catch (error) {
      let errorMsg: string;
      if (error instanceof TranslatableError) {
        errorMsg = this.translatePipe.transform(error.message);
      } else {
        errorMsg = error.message;
      }
      this.toastController
        .create({
          message: errorMsg,
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
    }

    this.loaded = true;
    await this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.translatePipe.transform('app.general.loading'),
    });
    await this.loading.present();
  }
}
