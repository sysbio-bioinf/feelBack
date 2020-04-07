import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
