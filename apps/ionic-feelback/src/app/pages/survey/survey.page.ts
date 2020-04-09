import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@cancerlog/core';
import { Instrument } from '@cancerlog/core/models/mobile/instrument.model';
import { LoadingController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { InstrumentService } from 'src/app/services/api/instrument.service';

@Component({
  selector: 'cancerlog-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
  providers: [TranslatePipe],
})
export class SurveyPage extends BaseComponent implements OnInit {
  loading: HTMLIonLoadingElement;
  instrument: Instrument;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private translatePipe: TranslatePipe,
    private loadingController: LoadingController,
    private instrumentService: InstrumentService,
  ) {
    super();
  }

  ngOnInit() {}

  navigateHome() {
    this.router.navigate(['main', 'home']);
  }

  async ionViewWillEnter() {
    await this.currentRoute.params.subscribe(async (params) => {
      await this.presentLoading();
      this.instrument = await this.instrumentService.getById(params.id);
      await this.loading.dismiss();
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.translatePipe.transform('app.general.loading'),
    });
    await this.loading.present();
  }
}
