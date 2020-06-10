import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicModule } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { LoginQrcodePage } from './login-qrcode.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginQrcodePage', () => {
  let component: LoginQrcodePage;
  let fixture: ComponentFixture<LoginQrcodePage>;

  let barcodeScannerSpy;
  let translateServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginQrcodePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        TranslateTestingModule.withTranslations('en', {}),
        FormsModule,
      ],
      providers: [
        { provide: BarcodeScanner, useValue: barcodeScannerSpy },
        { provide: TranslateService, useValue: translateServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(LoginQrcodePage);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
