import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { Instrument } from '../../models/instrument.model';
import { InstrumentService } from '../../services/api/instrument.service';
import { SurveyPage } from './survey.page';

describe('SurveyPage', () => {
  let component: SurveyPage;
  let fixture: ComponentFixture<SurveyPage>;

  const routerMock = {
    navigate: jest.fn(),
    getCurrentNavigation: jest.fn(() => {
      return {
        extras: {
          state: {
            locale: 'en',
          },
        },
      };
    }),
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

  const mockParams = {
    id: '0',
  };
  const activatedRouteMock = {
    params: of(mockParams),
    queryParams: of({}),
  };

  const instrumentMock: Instrument = {
    id: '42',
    name: 'mockInstrument',
    description: 'mockDescription',
    type: 'mock',
    payload: {},
  };

  const instrumentServiceMock = {
    getById: jest.fn((id: string) => Promise.resolve(instrumentMock)),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SurveyPage],
        imports: [
          IonicModule.forRoot(),
          TranslateTestingModule.withTranslations('en', {}),
        ],
        providers: [
          TranslatePipe,
          { provide: Router, useValue: routerMock },
          { provide: LoadingController, useValue: loadingControllerMock },
          { provide: ActivatedRoute, useValue: activatedRouteMock },
          { provide: InstrumentService, useValue: instrumentServiceMock },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(SurveyPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', async () => {
    expect(component).toBeTruthy();
    // test constructor (selectedLanguage should be set afterwards)
    expect(component.selectedLanguage).toBe('en');
    // ngOnInit variables
    expect(component.showCancelSurveyButton).toBe(true);
    expect(component.showFontScaleButtons).toBe(true);
  });

  it('should get the instrument by id within ionViewWillEnter', async () => {
    expect(component.instrument).toBe(undefined);
    await component.ionViewWillEnter();
    // IMPORTANT: multiple resolves are required
    // this.presentLoading(); ==>
    //    first: await this.loadingController.create()
    //    second: await this.loading.present()
    // third: await this.instrumentService.getById()
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(component.instrument).toBe(instrumentMock);
    expect(instrumentServiceMock.getById).toHaveBeenCalledWith(mockParams.id);
    expect(loadingMock.present).toHaveBeenCalled();
    expect(loadingMock.dismiss).toHaveBeenCalled();
  });

  it('should be able to hide and show the buttons in the header', () => {
    expect(component.showCancelSurveyButton).toBe(true);
    expect(component.showFontScaleButtons).toBe(true);
    component.hideHeaderButtons(true);
    expect(component.showCancelSurveyButton).toBe(false);
    expect(component.showFontScaleButtons).toBe(false);
    component.hideHeaderButtons(false);
    expect(component.showCancelSurveyButton).toBe(true);
    expect(component.showFontScaleButtons).toBe(true);
  });

  it('should navigate home', () => {
    component.navigateHome();
    expect(routerMock.navigate).toHaveBeenLastCalledWith(['main', 'home'], {
      replaceUrl: true,
    });
  });
});
