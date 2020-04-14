import { Component, OnInit } from '@angular/core';
import { Organization } from '@cancerlog/core/models/mobile';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/api/organization.service';
import { BaseComponent } from '@cancerlog/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'cancerlog-organization-list',
  templateUrl: './organization-list.page.html',
  styleUrls: ['./organization-list.page.scss'],
  providers: [TranslatePipe],
})
export class OrganizationListPage extends BaseComponent implements OnInit {
  organizations: Organization[];
  loading: HTMLIonLoadingElement;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private organizationService: OrganizationService,
    private translatePipe: TranslatePipe,
  ) {
    super();
  }

  ngOnInit() {}

  showDetails(id: string) {
    this.router.navigate(['main', 'organizations', id]);
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    this.organizations = await this.organizationService.getAll();
    await this.loading.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.translatePipe.transform('app.general.loading'),
    });
    await this.loading.present();
  }
}
