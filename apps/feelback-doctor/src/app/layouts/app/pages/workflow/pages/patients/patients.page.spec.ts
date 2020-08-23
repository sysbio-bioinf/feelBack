import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsPage } from './patients.page';
import { ComponentsModule } from '../../../../../../components/components.module';
import { Apollo } from 'apollo-angular';
import { MaterialModule } from '../../../../../../../../src/app/material.module';

describe('PatientsPage', () => {
  let component: PatientsPage;
  let fixture: ComponentFixture<PatientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, MaterialModule],
      providers: [Apollo],
      declarations: [PatientsPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
