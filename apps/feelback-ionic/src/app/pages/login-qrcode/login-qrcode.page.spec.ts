import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicModule } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { LoginQrcodePage } from './login-qrcode.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Apollo } from 'apollo-angular';

describe('LoginQrcodePage', () => {
  let component: LoginQrcodePage;
  let fixture: ComponentFixture<LoginQrcodePage>;

  const barcodeScannerSpy = undefined;
  const translateServiceSpy = undefined;

  beforeEach(waitForAsync(() => {
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
        Apollo
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(LoginQrcodePage);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
