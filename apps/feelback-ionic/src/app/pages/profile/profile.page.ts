import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IdentityService } from '../../services/api/identity.service';
import { AbstractComponent } from '../../core/components/abstract.component';
import { Identity } from '../../graphql/generated/feelback.graphql';
import { TranslatableError } from '../../core/customErrors/translatableError';

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
    public userService: UserService,
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

  navigateToLogin() {
    this.router.navigate(['auth', 'login'], { replaceUrl: true });
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    if (!this.userService.pseudonym) {
      this.toastController
        .create({
          message: this.translatePipe.transform(
            'app.pages.profile.toasts.notLoggedIn',
          ),
          buttons: [
            {
              side: 'end',
              text: this.translatePipe.transform('app.general.cancel'),
              role: 'cancel',
            },
            {
              side: 'end',
              text: 'Login',
              handler: () => {
                this.navigateToLogin();
              },
            },
          ],
          duration: 5000,
        })
        .then((toast) => {
          toast.present();
        });
      this.navigateToHome();
      return;
    } else {
      await this.presentLoading();
      try {
        this.identity = await this.identityService.getIdentityByPseudonym(
          this.userService.pseudonym,
        );
        if (!this.identity) {
          throw new TranslatableError('app.errors.services.identity.notFound');
        }
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
            duration: 5000,
          })
          .then((toast) => {
            toast.present();
          });
      }
      await this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: this.translatePipe.transform('app.general.loading'),
    });
    await this.loading.present();
  }
}
