import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { Faq } from '../../models/faq.model';
import { FaqService } from '../../services/api/faq.service';

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
    readonly loadingController: LoadingController,
    readonly translatePipe: TranslatePipe,
    private faqService: FaqService,
    private toastController: ToastController,
  ) {
    super();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.presentLoading();
    try {
      this.faqs = await this.faqService.getAll();
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

  showDetails(id: string) {
    this.router.navigate(['main', 'faqs', id]);
  }

  navigateToHome() {
    this.router.navigate(['main', 'home'], { replaceUrl: true });
  }
}
