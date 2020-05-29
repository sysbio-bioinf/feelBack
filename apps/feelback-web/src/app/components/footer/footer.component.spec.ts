import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GraphQLModule } from '../../modules/graphql.module';
import { ComponentsModule } from '../../modules/components.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HttpClientModule } from '@angular/common/http';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        GraphQLModule,
        ComponentsModule,
        TranslateTestingModule.withTranslations('en', {}),
        HttpClientModule,
      ],
      declarations: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // TODO: write tests here
  });
});
