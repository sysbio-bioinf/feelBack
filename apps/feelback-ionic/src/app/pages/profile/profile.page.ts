import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IdentityService } from 'src/app/services/api/identity.service';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { Identity } from 'src/app/graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-profile',
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

  ngOnInit() {
    // if (!this.userService.pseudonym) {
    //   const toast = this.toastController
    //     .create({
    //       message: this.translatePipe.transform('app.pages.profile.toasts.notLoggedIn'),
    //       duration: 2000,
    //     })
    //     .then((toast) => {
    //       toast.present();
    //     });
    //   this.navigateToHome();
    // }
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    this.identity = await this.identityService.getIdentityByPseudonym('foobar');
    await this.loading.dismiss();

    console.log(this.identity);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.translatePipe.transform('app.general.loading'),
    });
    await this.loading.present();
  }
}
