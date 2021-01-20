import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Organization } from '../../models/organization.model';
import { AbstractComponent } from '../../core/components/abstract.component';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { OrganizationService } from '../../services/api/organization.service';

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
  ) {
    super();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.currentRoute.params.subscribe(async (params) => {
      await this.presentLoading();
      this.organization = await this.organizationService.getById(params.id);
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
