import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Idle } from '@ng-idle/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


describe('AppComponent', () => {
  let statusBarSpy;
  let splashScreenSpy;
  let platformReadySpy;
  let platformSpy;
  let storageServiceSpy;
  let idleSpy;
  let screenOrientationSpy;

  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent

  beforeEach(waitForAsync(() => {
    statusBarSpy = { styleDefault: jest.fn() };
    splashScreenSpy = { hide: jest.fn() };
    platformReadySpy = jest.fn().mockImplementation(() => Promise.resolve());
    platformSpy = {
      ready: platformReadySpy,
      backButton: {subscribeWithPriority: jest.fn() }
    };
    storageServiceSpy = {
      createFeelbackDirectories: jest
        .fn()
        .mockImplementation(() => Promise.resolve()),
    };
    idleSpy = {setIdle: jest.fn(),
      setTimeout: jest.fn(),
      setInterrupts: jest.fn(),
      onIdleEnd: {subscribe: jest.fn()},
      onTimeout: {subscribe: jest.fn()},
      onIdleStart: {subscribe: jest.fn()},
      onTimeoutWarning: {subscribe: jest.fn(() => 0)},
      watch: jest.fn()};
    screenOrientationSpy = {
      ORIENTATIONS: {PORTRAIT: 'portrait', LANDSCAPE: 'landscape'},
      lock: jest.fn(orientation => jest.fn())
    };

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(),
        RouterTestingModule,
        TranslateTestingModule.withTranslations('en', {}),],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
         { provide: StatusBar, useValue: statusBarSpy },
         { provide: SplashScreen, useValue: splashScreenSpy },
         { provide: Platform, useValue: platformSpy },
         { provide: StorageService, useValue: storageServiceSpy },
         { provide: Idle, useValue: idleSpy},
         { provide: ScreenOrientation, useValue: screenOrientationSpy}
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize the app', async () => {
  //   expect(component).toBeTruthy();
  //   TestBed.createComponent(AppComponent);
  //   expect(platformSpy.ready).toHaveBeenCalled();
  //   // await platformReadySpy();

  //   expect(statusBarSpy.styleDefault).toHaveBeenCalled();
  //   expect(splashScreenSpy.hide).toHaveBeenCalled();
  // });

  // TODO: add more tests!
});
