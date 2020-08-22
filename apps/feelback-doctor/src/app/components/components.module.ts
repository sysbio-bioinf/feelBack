import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './util/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ListComponent } from './patients/list/list.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionnaireComponent } from './result/questionnaire/questionnaire.component';
import { LoadingComponent } from './util/loading/loading.component';
import { OverviewComponent } from './result/overview/overview.component';
import { EmptyStateComponent } from './util/empty-state/empty-state.component';
import { ErrorIndicatorComponent } from './util/error-indicator/error-indicator.component';
import { CircleImageComponent } from './util/circle-image/circle-image.component';
import { ConsultationComponent } from './result/consultation/consultation.component';
import { InstrumentInfoComponent } from './result/instrument-info/instrument-info.component';
import { ActionBarComponent } from './util/action-bar/action-bar.component';
import { FooterComponent } from './util/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    ListComponent,
    QuestionnaireComponent,
    LoadingComponent,
    ErrorIndicatorComponent,
    OverviewComponent,
    EmptyStateComponent,
    CircleImageComponent,
    ConsultationComponent,
    InstrumentInfoComponent,
    ActionBarComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, NgxChartsModule, ReactiveFormsModule],
  exports: [
    NavbarComponent,
    ListComponent,
    LoadingComponent,
    EmptyStateComponent,
    CircleImageComponent,
    ConsultationComponent,
    QuestionnaireComponent,
    OverviewComponent,
    ErrorIndicatorComponent,
    CircleImageComponent,
    InstrumentInfoComponent,
    ActionBarComponent,
    FooterComponent
  ],
})
export class ComponentsModule {}
