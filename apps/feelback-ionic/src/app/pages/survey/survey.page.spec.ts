import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyPage } from './survey.page';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { GraphQLModule } from '../../modules/graphql.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyPage],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterModule,
        GraphQLModule,
      ],
      providers: [
        TranslatePipe,
        HttpClient,
        HttpHandler,
        { provide: Router, useClass: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
