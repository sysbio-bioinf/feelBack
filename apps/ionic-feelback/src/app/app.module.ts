import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { GraphQLModule } from './modules/graphql.module';
import { NgPipesModule } from 'ngx-pipes';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    NgPipesModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    GraphQLModule,
  ],
  providers: [File],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
