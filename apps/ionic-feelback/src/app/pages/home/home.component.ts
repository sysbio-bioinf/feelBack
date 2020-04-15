import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@cancerlog/core';
import { Router } from '@angular/router';
import { Instrument } from '@cancerlog/core/models/mobile';
import { LoadingController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { InstrumentService } from 'src/app/services/api/instrument.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
  providers: [TranslatePipe],
})
export class HomeComponent extends BaseComponent implements OnInit {
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

  ngOnInit() {}

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

  startInstrument(id: string) {
    this.router.navigate(['main', 'surveys', id], { replaceUrl: true });
  }
}
