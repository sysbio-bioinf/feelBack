import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginQrcodePage } from './login-qrcode.page';

describe('LoginQrcodePage', () => {
  let component: LoginQrcodePage;
  let fixture: ComponentFixture<LoginQrcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginQrcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginQrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
