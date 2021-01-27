import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Organization } from '../../models/organization.model';
import { AbstractComponent } from '../../core/components/abstract.component';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { OrganizationService } from '../../services/api/organization.service';
import { TranslatableError } from '../../core/customErrors/translatableError';

@Component({
  selector: 'feelback-ionic-organization-detail',
  templateUrl: './organization-detail.page.html',
  styleUrls: ['./organization-detail.page.scss'],
  providers: [TranslatePipe],
})
export class OrganizationDetailPage
  extends AbstractComponent
  implements OnInit {
  organization: Organization;
  loading: HTMLIonLoadingElement;

  constructor(
    private currentRoute: ActivatedRoute,
    readonly loadingController: LoadingController,
    private translatePipe: TranslatePipe,
    private organizationService: OrganizationService,
    private toastController: ToastController,
  ) {
    super();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.currentRoute.params.subscribe(async (params) => {
      await this.presentLoading();
      try {
        this.organization = await this.organizationService.getById(params.id);
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
