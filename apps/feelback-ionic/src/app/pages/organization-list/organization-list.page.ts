import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { Organization } from '../../models/organization.model';
import { OrganizationService } from '../../services/api/organization.service';

@Component({
  selector: 'feelback-ionic-organization-list',
  templateUrl: './organization-list.page.html',
  styleUrls: ['./organization-list.page.scss'],
  providers: [TranslatePipe],
})
export class OrganizationListPage extends AbstractComponent {
  organizations: Organization[] = [];
  loading: HTMLIonLoadingElement;
  loaded = false;

  constructor(
    readonly router: Router,
    readonly loadingController: LoadingController,
    private organizationService: OrganizationService,
    private translatePipe: TranslatePipe,
    private toastController: ToastController,
  ) {
    super();
  }

  async showDetails(id: string) {
    this.router.navigate(['main', 'organizations', id]);
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    try {
      this.organizations = await this.organizationService.getAll();
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
