import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentInfoComponent } from './instrument-info.component';
import { MaterialModule } from '../../../material.module';

describe('InstrumentInfoComponent', () => {
  let component: InstrumentInfoComponent;
  let fixture: ComponentFixture<InstrumentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ InstrumentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentInfoComponent);
    component = fixture.componentInstance;
    component.instrument = {id: 'id', name:'name', createdAt: new Date(), updatedAt: new Date(), changelog: '', type: '', version: 1};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
