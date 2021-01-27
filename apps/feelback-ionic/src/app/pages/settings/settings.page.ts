import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { ApplicationLanguageModel } from '../../models/application-language.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'feelback-ionic-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  providers: [TranslatePipe],
})
export class SettingsPage extends AbstractComponent implements OnInit {
  currentLanguage: string;

  availableLanguages: ApplicationLanguageModel[];

  constructor(
    private languageService: LanguageService,
    private toastController: ToastController,
    readonly translatePipe: TranslatePipe,
  ) {
    super();
  }

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    try {
      this.availableLanguages = this.languageService.getAvailableLanguages();
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
  }

  switchLanguage(event: CustomEvent) {
    this.languageService.switchLanguage(event.detail.value);
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }
}
