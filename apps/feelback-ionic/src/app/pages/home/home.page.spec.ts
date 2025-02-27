import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  IonicModule,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslatableError } from '../../core/customErrors/translatableError';
import { Instrument } from '../../models/instrument.model';
import { InstrumentService } from '../../services/api/instrument.service';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  const loadingMock = {
    present: jest.fn(() => Promise.resolve()),
    dismiss: jest.fn(() => Promise.resolve()),
    setContent: jest.fn(() => Promise.resolve()),
    setSpinner: jest.fn(() => Promise.resolve()),
  };

  const loadingControllerMock = {
    create: jest.fn((any) => loadingMock),
  };

  const toastMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const toastControllerMock = {
    create: jest.fn((any) => Promise.resolve(toastMock)),
  };

  const instrumentsMock: Instrument[] = [
    {
      id: '42',
      name: 'mockInstrument',
      description: 'mockDescription',
      type: 'mock',
      payload: {},
    },
  ];

  const instrumentServiceMock = {
    getAll: jest.fn(() => Promise.resolve(instrumentsMock)),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          TranslateTestingModule.withTranslations('en', {}),
        ],
        providers: [
          TranslatePipe,
          Apollo,
          HttpClient,
          { provide: LoadingController, useValue: loadingControllerMock },
          { provide: InstrumentService, useValue: instrumentServiceMock },
          { provide: ToastController, useValue: toastControllerMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the instrument service and use the loadingcontroller', async () => {
    await component.ionViewWillEnter();
    expect(component.instruments).toBe(instrumentsMock);
    expect(component.loaded).toBe(true);
    expect(component.loading.present).toHaveBeenCalled();
    expect(component.loading.dismiss).toHaveBeenCalled();
    expect(component.loadingController.create).toHaveBeenCalledWith({
      message: 'app.general.loading',
    });
  });

  it('should handle errors', async () => {
    let errMsg = 'Service Error';
    instrumentServiceMock.getAll.mockImplementationOnce(() => {
      throw new Error(errMsg);
    });
    await component.ionViewWillEnter();
    expect(toastControllerMock.create).toBeCalled();
    expect(toastControllerMock.create.mock.calls[0][0].message).toBe(errMsg);
    errMsg = 'app.error.msg';
    instrumentServiceMock.getAll.mockImplementationOnce(() => {
      throw new TranslatableError(errMsg);
    });
    await component.ionViewWillEnter();
    expect(toastControllerMock.create.mock.calls[1][0].message).toBe(errMsg);
  });
});
