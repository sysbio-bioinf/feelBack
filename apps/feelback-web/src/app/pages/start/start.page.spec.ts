import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPage } from './start.page';
import { ComponentsModule } from '../../modules/components.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Apollo } from 'apollo-angular';

describe('StartPage', () => {
  let component: StartPage;
  let fixture: ComponentFixture<StartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        TranslateTestingModule.withTranslations('en', {}),
      ],
      providers: [Apollo],
      declarations: [StartPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
