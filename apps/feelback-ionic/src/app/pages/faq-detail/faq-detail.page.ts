import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { FaqService } from '../../services/api/faq.service';
import { Faq } from '../../models/faq.model';
import { TranslatableError } from '../../core/customErrors/translatableError';

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
    private toastController: ToastController,
  ) {
    super();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.currentRoute.params.subscribe(async (params) => {
      await this.presentLoading();
      try {
        this.faq = await this.faqService.getById(params.id);
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
