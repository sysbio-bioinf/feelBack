import { Component, OnInit } from '@angular/core';
import { Organization } from '@cancerlog/core/models/mobile/organization.model';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/api/organization.service';

@Component({
  selector: 'cancerlog-organization-list',
  templateUrl: './organization-list.page.html',
  styleUrls: ['./organization-list.page.scss'],
})
export class OrganizationListPage implements OnInit {
  organizations: Organization[];
  loading: any;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private organizationService: OrganizationService,
  ) {}

  ngOnInit() {}

  showDetails(id: string) {
    this.router.navigate(['main', 'organizations', id]);
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    this.organizations = await this.organizationService.loadOrganizations();
    await this.loading.dismiss();
  }

  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      message: 'Lade Daten...',
    });

    // Present the loading controller
    await this.loading.present();
  }
}
