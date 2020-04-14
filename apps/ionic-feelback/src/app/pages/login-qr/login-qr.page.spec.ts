import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginQrPage } from './login-qr.page';

describe('LoginQrPage', () => {
  let component: LoginQrPage;
  let fixture: ComponentFixture<LoginQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginQrPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
