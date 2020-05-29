import { async } from '@angular/core/testing/';
import { ComponentFixture } from '@angular/core/testing/';
import { TestBed } from '@angular/core/testing/';

import { ErrorPage } from './error.page';
import { ComponentsModule } from 'apps/feelback-doctor/src/app/components/components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';

describe('ErrorPage', () => {
  let component: ErrorPage;
  let fixture: ComponentFixture<ErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: Router, useClass: RouterStub },
      ],
      declarations: [ErrorPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class RouterStub {
  getCurrentNavigation() {
    return {
      extras: {
        state: {
        },
      },
    };
  }
}
