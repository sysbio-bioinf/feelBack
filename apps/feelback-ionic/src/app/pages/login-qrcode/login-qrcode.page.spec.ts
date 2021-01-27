import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { LoginQrcodePage } from './login-qrcode.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';

describe('LoginQrcodePage', () => {
  let component: LoginQrcodePage;
  let fixture: ComponentFixture<LoginQrcodePage>;

  const barcodeScannerSpy = undefined;

  const platformSpy = {
    is: jest.fn((platform: string) => true),
  };

  const routerMock = {
    navigate: jest.fn(),
  };

  const toastMock = {
    present: jest.fn(() => Promise.resolve()),
  };

  const toastControllerMock = {
    create: jest.fn((any) => Promise.resolve(toastMock)),
  };

  const userServiceMock = {
    loginWithPseudonym: jest.fn(async (pseudonym: string) => Promise.resolve()),
  };

  const scannerMock = {
    scan: jest.fn((any) => Promise.resolve({ text: 'textMock' })),
  };

  const cardPseudonymMock = 'cardPseudonym';

  const cardServiceMock = {
    readCard: jest.fn((any) => {
      const cardMock = {
        version: '1',
        pseudonym: cardPseudonymMock,
      };
      return cardMock;
    }),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginQrcodePage],
        imports: [
          IonicModule.forRoot(),
          TranslateTestingModule.withTranslations('en', {}),
          FormsModule,
        ],
        providers: [
          { provide: BarcodeScanner, useValue: barcodeScannerSpy },
          { provide: ToastController, useValue: toastControllerMock },
          { provide: UserService, useValue: userServiceMock },
          { provide: Router, useValue: routerMock },
          { provide: BarcodeScanner, useValue: scannerMock },
          { provide: CardService, useValue: cardServiceMock },
          { provide: Platform, useValue: platformSpy },
          Apollo,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
      fixture = TestBed.createComponent(LoginQrcodePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle pseudonym logins', async () => {
    expect(component.pseudonym).not.toBeDefined();
    component.pseudonym = '  ';
    await component.login();
    expect(!component.pseudonym).toBe(true);
    expect(component.toastController.create).toHaveBeenCalledWith({
      message: 'app.pages.login.pseudonymError.emptyString',
      buttons: [
        {
          side: 'end',
          text: 'app.general.ok',
        },
      ],
      duration: 3000,
    });
    component.pseudonym = 'testing';
    userServiceMock.loginWithPseudonym.mockReturnValueOnce(
      Promise.reject('invalid pseudonym'),
    );
    await component.login();
    expect(component.toastController.create).lastCalledWith({
      message: 'app.pages.login.pseudonymError.noMatch',
      buttons: [
        {
          side: 'end',
          text: 'app.general.ok',
        },
      ],
      duration: 3000,
    });
    component.pseudonym = 'fakeCorrect';
    await component.login();
    expect(component.router.navigate).toHaveBeenLastCalledWith(
      ['main', 'home'],
      { replaceUrl: true },
    );
  });

  it('should be able to scan a card', async () => {
    expect(!component.pseudonym).toBe(true);
    await component.openScanner();
    expect(component.pseudonym).toBe(cardPseudonymMock);
    const rejectReason = 'error';
    scannerMock.scan.mockReturnValueOnce(Promise.reject(rejectReason));
    expect(component.scanner.scan).rejects.toEqual(rejectReason);
    platformSpy.is.mockReturnValueOnce(false);
    await component.openScanner();
    expect(component.toastController.create).toHaveBeenCalledWith({
      message: 'app.pages.login.scanner.error',
      duration: 3000,
    });
  });
});
