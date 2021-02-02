import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, IonicModule, Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { Idle } from '@ng-idle/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let statusBarSpy;
  let splashScreenSpy;
  let platformReadySpy;
  let platformSpy;
  let storageServiceSpy;
  let idleSpy;
  let screenOrientationSpy;

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  let router: Router;

  statusBarSpy = { styleDefault: jest.fn() };
  splashScreenSpy = { hide: jest.fn() };
  platformReadySpy = jest.fn().mockImplementation(() => Promise.resolve());
  platformSpy = {
    ready: platformReadySpy,
    backButton: { subscribeWithPriority: jest.fn() },
    is: jest.fn((platform: string) => true),
  };
  storageServiceSpy = {
    createFeelbackDirectories: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.reject('test'))
      .mockImplementation(() => Promise.resolve()),
  };
  idleSpy = {
    setIdle: jest.fn(),
    setTimeout: jest.fn(),
    setInterrupts: jest.fn(),
    onIdleEnd: new EventEmitter<number>(),
    onTimeout: new EventEmitter<number>(),
    onIdleStart: new EventEmitter<any>(),
    onTimeoutWarning: new EventEmitter<number>(),
    // onIdleEnd: { subscribe: jest.fn(() => of('idleEnd')) },
    // onTimeout: { subscribe: jest.fn(() => of('timeout')) },
    // onIdleStart: { subscribe: jest.fn() },
    // onTimeoutWarning: { subscribe: jest.fn(() => 0) },
    watch: jest.fn(),
    getTimeout: jest.fn(() => 60),
  };
  screenOrientationSpy = {
    ORIENTATIONS: { PORTRAIT: 'portrait', LANDSCAPE: 'landscape' },
    lock: jest.fn((orientation) => jest.fn()),
  };

  class MockAlert {
    public visible: boolean;
    public header: string;
    public subHeader: string;
    public message: string;

    constructor(props: any) {
      Object.assign(this, props);
      this.visible = false;
    }

    present() {
      this.visible = true;
      return Promise.resolve();
    }

    dismiss() {
      this.visible = false;
      return Promise.resolve();
    }
  }

  class MockAlertController {
    public created: MockAlert[];

    constructor() {
      this.created = [];
    }

    create(props: any): Promise<any> {
      const toRet = new MockAlert(props);
      this.created.push(toRet);
      return Promise.resolve(toRet);
    }

    getLast() {
      if (!this.created.length) {
        return null;
      }
      return this.created[this.created.length - 1];
    }
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          IonicModule,
          RouterTestingModule.withRoutes([]),
          TranslateTestingModule.withTranslations('en', {}),
        ],
        declarations: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          { provide: StatusBar, useValue: statusBarSpy },
          { provide: SplashScreen, useValue: splashScreenSpy },
          { provide: Platform, useValue: platformSpy },
          { provide: StorageService, useValue: storageServiceSpy },
          { provide: Idle, useValue: idleSpy },
          { provide: ScreenOrientation, useValue: screenOrientationSpy },
          { provide: AlertController, useValue: new MockAlertController() },
        ],
      }).compileComponents();

      router = TestBed.inject(Router);

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the app', () => {
    expect(platformSpy.ready).toHaveBeenCalled();
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
    // call initializeApp once more to test reject path of createFeelbackDirectories()
    component.initializeApp();
    expect(storageServiceSpy.createFeelbackDirectories).toHaveBeenCalledTimes(
      2,
    );
  });

  it('should handle timeouts', async () => {
    // onTimeout
    await component.presentIdleAlert();
    expect(component.alert).toBeDefined();
    expect(component.idleAlertShown).toBe(true);
    idleSpy.onTimeout.emit('timeout');
    expect(component.idleAlertShown).toBe(false);
    // results from reset():
    expect(idleSpy.watch).toBeCalled();
    expect(component.idleState).toEqual('Started.');
    expect(component.timedOut).toBe(false);
  });

  it('should logout a user', () => {
    const navigateMock = jest.spyOn(router, 'navigate');
    component.logout();
    expect(navigateMock).toHaveBeenCalledWith(['/'], { replaceUrl: true });
  });

  it('should be able to show alerts', fakeAsync(() => {
    component.presentIdleAlert();
    tick(1000);

    const mockAlertController = (component.alertController as any) as MockAlertController;

    expect(mockAlertController.getLast().visible).toBeTruthy();
    expect(mockAlertController.getLast().header).toBe('app.idle.header');
    expect(mockAlertController.getLast().subHeader).toBe('app.idle.subheader');
  }));

  it('should change idleStates', () => {
    // onIdleStart
    idleSpy.onIdleStart.emit('startIdleEvent');
    expect(component.idleState).toEqual("You've gone idle!");
    // onIdleEnd
    idleSpy.onIdleEnd.emit('endIdleEvent');
    expect(component.idleState).toEqual('No longer idle.');
  });

  it('should create idle Timeout warning', () => {
    component.idleAlertShown = false;
    const mockTimeout = 44;
    idleSpy.onTimeoutWarning.emit(mockTimeout);
    expect(component.idleAlertShown).toBe(true);
    expect(component.idleState).toEqual(
      'You will time out in ' + mockTimeout + ' seconds!',
    );
    expect(component.timeBeforeTimeout).toBe(mockTimeout);
  });
});
