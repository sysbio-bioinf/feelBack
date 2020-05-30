import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AppComponent } from './app.component';
import {
  RouterTestingModule,
  SpyNgModuleFactoryLoader,
} from '@angular/router/testing';
import { File } from '@ionic-native/file';
import { StorageService } from './services/storage.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let statusBarSpy,
    splashScreenSpy,
    platformReadySpy,
    platformSpy,
    storageServiceSpy;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy });
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      test: 'test',
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: StorageService, useValue: storageServiceSpy },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // TODO: add more tests!
});
