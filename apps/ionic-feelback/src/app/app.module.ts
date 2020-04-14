import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { File } from '@ionic-native/file/ngx';
import { MarkdownModule } from 'ngx-markdown';
import { NgPipesModule } from 'ngx-pipes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { GraphQLModule } from './modules/graphql.module';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    NgPipesModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    GraphQLModule,
  ],
  providers: [File, BarcodeScanner],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
