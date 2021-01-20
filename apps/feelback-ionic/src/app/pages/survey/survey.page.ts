import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';
import { InstrumentService } from '../../services/api/instrument.service';
import { AbstractComponent } from '../../core/components/abstract.component';
import { Instrument } from '../../models/instrument.model';

@Component({
  selector: 'feelback-ionic-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
  providers: [TranslatePipe],
})
export class SurveyPage extends AbstractComponent implements OnInit {
  loading: HTMLIonLoadingElement;
  instrument: Instrument;
  selectedLanguage: string;

  showCancelSurveyButton = true;
  showFontScaleButtons = true;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private translatePipe: TranslatePipe,
    private loadingController: LoadingController,
    private instrumentService: InstrumentService,
  ) {
    super();

    this.currentRoute.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedLanguage = this.router.getCurrentNavigation().extras.state.locale;
      }
    });
  }

  ngOnInit() {
    this.showCancelSurveyButton = true;
    this.showFontScaleButtons = true;
  }

  navigateHome() {
    this.router.navigate(['main', 'home'], { replaceUrl: true });
  }

  async ionViewWillEnter() {
    this.currentRoute.params.subscribe(async (params) => {
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

  hideHeaderButtons(hideButtons: boolean) {
    this.showCancelSurveyButton = !hideButtons;
    this.showFontScaleButtons = !hideButtons;
  }
}
