import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  IonicModule,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { FaqService } from '../../services/api/faq.service';
import { FaqListPage } from './faq-list.page';
import { Faq } from '../../models/faq.model';
import { Router } from '@angular/router';
import { TranslatableError } from '../../core/customErrors/translatableError';

describe('FaqListPage', () => {
  let component: FaqListPage;
  let fixture: ComponentFixture<FaqListPage>;

  const faqsmock: Faq[] = [
    { id: '0', question: 'none', answer: 'yes', isActive: false },
  ];

  const faqServiceMock = {
    getAll: jest.fn(() => Promise.resolve(faqsmock)),
  };

  const loadingMock = {
    present: jest.fn(() => Promise.resolve()),
    dismiss: jest.fn(() => Promise.resolve()),
    setContent: jest.fn(() => Promise.resolve()),
    setSpinner: jest.fn(() => Promise.resolve()),
  };

  const toastMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const toastControllerMock = {
    create: jest.fn((any) => Promise.resolve(toastMock)),
  };

  const loadingControllerMock = {
    create: jest.fn((any) => loadingMock),
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FaqListPage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          TranslateTestingModule.withTranslations('en', {}),
        ],
        providers: [
          Apollo,
          { provide: LoadingController, useValue: loadingControllerMock },
          { provide: FaqService, useValue: faqServiceMock },
          { provide: Router, useValue: routerMock },
          { provide: ToastController, useValue: toastControllerMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(FaqListPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the services on ionViewWillEnter', async () => {
    await component.ionViewWillEnter();
    expect(component.faqs).toBe(faqsmock);
    expect(component.loaded).toBe(true);
    expect(component.loading.present).toHaveBeenCalled();
    expect(component.loading.dismiss).toHaveBeenCalled();
    expect(component.loadingController.create).toHaveBeenCalledWith({
      message: 'app.general.loading',
    });
  });

  it('should navigate to the faq-detail page', () => {
    const tmpId = '0';
    component.showDetails(tmpId);
    expect(routerMock.navigate).toHaveBeenCalledWith(['main', 'faqs', tmpId]);
  });

  it('should navigate home', () => {
    component.navigateToHome();
    expect(routerMock.navigate).toHaveBeenCalledWith(['main', 'home'], {
      replaceUrl: true,
    });
  });

  it('should handle errors', async () => {
    let errMsg = 'Service Error';
    faqServiceMock.getAll.mockImplementationOnce(() => {
      throw new Error(errMsg);
    });
    await component.ionViewWillEnter();
    expect(toastControllerMock.create).toBeCalled();
    expect(toastControllerMock.create.mock.calls[0][0].message).toBe(errMsg);
    errMsg = 'app.error.msg';
    faqServiceMock.getAll.mockImplementationOnce(() => {
      throw new TranslatableError(errMsg);
    });
    await component.ionViewWillEnter();
    expect(toastControllerMock.create.mock.calls[1][0].message).toBe(errMsg);
  });
});
