import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentInfoComponent } from './instrument-info.component';
import { MaterialModule } from '../../../material.module';
import { DatePipe } from '@angular/common';
import { InstrumentStatesEnum } from '../../../graphql/generated/feelback.graphql';

describe('InstrumentInfoComponent', () => {
  let component: InstrumentInfoComponent;
  let fixture: ComponentFixture<InstrumentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [InstrumentInfoComponent],
      providers: [DatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentInfoComponent);
    component = fixture.componentInstance;
    component.instrument = {
      id: 'id',
      name: 'name',
      createdAt: new Date(),
      updatedAt: new Date(),
      changelog: '',
      type: '',
      version: 1,
      payload: {},
      rules: [],
      diagram: {},
      state: InstrumentStatesEnum.Released,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
