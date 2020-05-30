import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaqListPage } from './faq-list.page';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Apollo } from 'apollo-angular';

describe('FaqListPage', () => {
  let component: FaqListPage;
  let fixture: ComponentFixture<FaqListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqListPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, TranslateTestingModule.withTranslations('en', {}),],
      providers: [Apollo]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
