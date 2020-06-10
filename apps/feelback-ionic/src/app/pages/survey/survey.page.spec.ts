import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { GraphQLModule } from '../../modules/graphql.module';
import { SurveyPage } from './survey.page';

describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyPage],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule,
        GraphQLModule,
      ],
      providers: [TranslatePipe, HttpClient, HttpHandler],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(SurveyPage);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
