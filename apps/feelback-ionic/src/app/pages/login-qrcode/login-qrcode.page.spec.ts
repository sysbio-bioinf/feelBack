import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginQrcodePage } from './login-qrcode.page';
import { RouterTestingModule } from '@angular/router/testing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { FormsModule } from '@angular/forms';

describe('LoginQrcodePage', () => {
  let component: LoginQrcodePage;
  let fixture: ComponentFixture<LoginQrcodePage>;
  const barcodeScannerSpy = jasmine.createSpyObj('BarcodeScanner', {test: 'test'});
  const TranslateServiceSpy = jasmine.createSpyObj('TranslateService', {test: 'test'});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginQrcodePage ],
      imports: [IonicModule.forRoot(), RouterTestingModule, TranslateTestingModule.withTranslations('en', {}), FormsModule],
      providers: [
        { provide: BarcodeScanner, useValue: barcodeScannerSpy },
        { provide: TranslateService, useValue: TranslateServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginQrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
