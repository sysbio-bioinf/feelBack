import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintPage } from './imprint.page';
import { ComponentsModule } from '../../modules/components.module';
import { TranslateTestingModule } from 'ngx-translate-testing';

describe('ImprintPage', () => {
  let component: ImprintPage;
  let fixture: ComponentFixture<ImprintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        TranslateTestingModule.withTranslations('en', {}),
      ],
      declarations: [ImprintPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
