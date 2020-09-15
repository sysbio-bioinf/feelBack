import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AbstractComponent } from '../../core/components/abstract.component';
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
    private router: Router,
    private loadingController: LoadingController,
    private organizationService: OrganizationService,
    private translatePipe: TranslatePipe,
  ) {
    super();
  }

  async showDetails(id: string) {
    this.router.navigate(['main', 'organizations', id]);
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    this.organizations = await this.organizationService.getAll();
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
