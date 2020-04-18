import { HttpClient } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatformLanguageToken } from './misc/tokens';
import { CoreModule } from './modules/core.module';
import { GraphQLModule } from './modules/graphql.module';
import { SharedModule } from './modules/shared.module';

@NgModule({
  imports: [
    IonicModule.forRoot(),
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    GraphQLModule,
  ],
  providers: [StatusBar, SplashScreen],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
