import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginFormPage } from './login-form.page';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('LoginFormPage', () => {
  let component: LoginFormPage;
  let fixture: ComponentFixture<LoginFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormPage],
      imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      providers: [TranslatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
