import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, LoadingController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { FaqService } from '../../services/api/faq.service';
import { FaqDetailPage } from './faq-detail.page';

describe('FaqDetailPage', () => {
  let component: FaqDetailPage;
  let fixture: ComponentFixture<FaqDetailPage>;

  const faqmock = { id: '0', question: 'none', answer: 'yes', isActive: 'no' };
  const faqServiceMock = {
    getById: jest.fn((id: string) => Promise.resolve(faqmock)),
  };

  const loadingMock = {
    present: jest.fn(() => Promise.resolve()),
    dismiss: jest.fn(() => Promise.resolve()),
    setContent: jest.fn(() => Promise.resolve()),
    setSpinner: jest.fn(() => Promise.resolve()),
  };

  const loadingControllerMock = {
    create: jest.fn((any) => loadingMock),
  };

  const mockParams = [
    {
      id: '0',
    },
  ];

  const activatedRouteMock = {
    params: of(mockParams),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FaqDetailPage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          TranslateTestingModule.withTranslations('en', {}),
        ],
        providers: [
          Apollo,
          { provide: LoadingController, useValue: loadingControllerMock },
          { provide: FaqService, useValue: faqServiceMock },
          { provide: ActivatedRoute, useValue: activatedRouteMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(FaqDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the correct faq', async () => {
    await component.ionViewWillEnter();
    // IMPORTANT: the resolve is required three times!!
    // this.presentLoading(); ==>
    //    first: await this.loadingController.create()
    //    second: await this.loading.present()
    // third: await this.faqService.getById()
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(component.faq).toBe(faqmock);
    await Promise.resolve();
    expect(component.loading.present).toHaveBeenCalled();
    expect(component.loading.dismiss).toHaveBeenCalled();
  });
});
