import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Printer } from '@ionic-native/printer/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core.module';
import { GraphQLModule } from './modules/graphql.module';
import { SharedModule } from './modules/shared.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

@NgModule({
  imports: [
    IonicModule.forRoot(),
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    GraphQLModule,
  ],
  providers: [StatusBar, SplashScreen, File, Printer, BarcodeScanner],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
