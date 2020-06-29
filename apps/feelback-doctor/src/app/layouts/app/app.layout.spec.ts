import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayout } from './app.layout';
import { ComponentsModule } from '../../components/components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

describe('AppLayout', () => {
  let component: AppLayout;
  let fixture: ComponentFixture<AppLayout>;
  const keycloakServiceStub: Partial<KeycloakService> = {
    getUsername() {
      return 'user';
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [AppLayout],
      providers: [
        DatePipe,
        { provide: KeycloakService, useValue: keycloakServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
