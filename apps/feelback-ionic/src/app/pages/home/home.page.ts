import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { Instrument } from 'src/app/models/instrument.model';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { InstrumentService } from 'src/app/services/api/instrument.service';

@Component({
  selector: 'feelback-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [TranslatePipe],
})
export class HomePage extends AbstractComponent {
  instruments: Instrument[];
  loading: HTMLIonLoadingElement;

  constructor(
    readonly router: Router,
    readonly loadingController: LoadingController,
    readonly instrumentService: InstrumentService,
    readonly translatePipe: TranslatePipe,
  ) {
    super();
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    this.instruments = await this.instrumentService.getAll();
    await this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.translatePipe.transform('app.general.loading'),
    });
    await this.loading.present();
  }
}
