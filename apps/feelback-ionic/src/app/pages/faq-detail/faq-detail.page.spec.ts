import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaqDetailPage } from './faq-detail.page';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Apollo } from 'apollo-angular';

describe('FaqDetailPage', () => {
  let component: FaqDetailPage;
  let fixture: ComponentFixture<FaqDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqDetailPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        TranslateTestingModule.withTranslations('en', {}),
      ],
      providers: [Apollo]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
