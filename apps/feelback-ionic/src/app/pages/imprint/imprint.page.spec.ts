import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImprintPage } from './imprint.page';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('ImprintPage', () => {
  let component: ImprintPage;
  let fixture: ComponentFixture<ImprintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImprintPage],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      providers: [TranslatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ImprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
