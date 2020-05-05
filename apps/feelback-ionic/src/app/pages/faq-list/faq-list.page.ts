import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { Faq } from 'src/app/models/faq.model';
import { FaqService } from 'src/app/services/api/faq.service';

@Component({
  selector: 'feelback-ionic-faq-list',
  templateUrl: './faq-list.page.html',
  styleUrls: ['./faq-list.page.scss'],
  providers: [TranslatePipe],
})
export class FaqListPage extends AbstractComponent implements OnInit {
  faqs: Faq[] = [];
  loading: HTMLIonLoadingElement;
  loaded = false;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private translatePipe: TranslatePipe,
    private faqService: FaqService,
  ) {
    super();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.presentLoading();
    this.faqs = await this.faqService.getAll();
    this.loaded = true;
    await this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.translatePipe.transform('app.general.loading'),
    });
    await this.loading.present();
  }

  showDetails(id: string) {
    this.router.navigate(['main', 'faqs', id]);
  }
}
