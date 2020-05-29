import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentsPage } from './instruments.page';
import { ComponentsModule } from 'apps/feelback-doctor/src/app/components/components.module';
import { Apollo } from 'apollo-angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('InstrumentsPage', () => {
  let component: InstrumentsPage;
  let fixture: ComponentFixture<InstrumentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule],
      providers: [Apollo],
      declarations: [ InstrumentsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
