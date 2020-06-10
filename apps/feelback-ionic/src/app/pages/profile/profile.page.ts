import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IdentityService } from '../../services/api/identity.service';
import { AbstractComponent } from '../../core/components/abstract.component';
import { Identity } from '../../graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-ionic-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [TranslatePipe],
})
export class ProfilePage extends AbstractComponent implements OnInit {
  identity: Partial<Identity>;
  loading: HTMLIonLoadingElement;

  constructor(
    private router: Router,
    private userService: UserService,
    private identityService: IdentityService,
    private toastController: ToastController,
    private translatePipe: TranslatePipe,
    private loadingController: LoadingController,
  ) {
    super();
  }

  navigateToHome() {
    this.router.navigate(['main', 'home'], { replaceUrl: true });
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    if (!this.userService.pseudonym) {
      const t = this.toastController
        .create({
          message: this.translatePipe.transform(
            'app.pages.profile.toasts.notLoggedIn',
          ),
          duration: 2000,
        })
        .then((toast) => {
          toast.present();
        });
      this.navigateToHome();
      return;
    }

    await this.presentLoading();
    this.identity = await this.identityService.getIdentityByPseudonym(
      this.userService.pseudonym,
    );
    await this.loading.dismiss();

    if (!this.identity) {
      const t = this.toastController
        .create({
          message: this.translatePipe.transform('app.errors.api.noData'),
          duration: 3000,
        })
        .then((toast) => {
          toast.present();
        });
      this.navigateToHome();
      return;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.translatePipe.transform('app.general.loading'),
    });
    await this.loading.present();
  }
}
