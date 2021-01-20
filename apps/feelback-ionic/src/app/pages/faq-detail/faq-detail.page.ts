import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { FaqService } from '../../services/api/faq.service';
import { Faq } from '../../models/faq.model';

@Component({
  selector: 'feelback-ionic-faq-detail',
  templateUrl: './faq-detail.page.html',
  styleUrls: ['./faq-detail.page.scss'],
  providers: [TranslatePipe],
})
export class FaqDetailPage extends AbstractComponent implements OnInit {
  faq: Faq;
  loading: HTMLIonLoadingElement;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private translatePipe: TranslatePipe,
    private faqService: FaqService,
  ) {
    super();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.currentRoute.params.subscribe(async (params) => {
      await this.presentLoading();
      this.faq = await this.faqService.getById(params.id);
      this.loading.dismiss();
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.translatePipe.transform('app.general.loading'),
    });
    await this.loading.present();
  }
}
