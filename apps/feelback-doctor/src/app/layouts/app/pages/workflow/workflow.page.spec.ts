import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowPage } from './workflow.page';
import { ComponentsModule } from '../../../../components/components.module';
import { MaterialModule } from '../../../../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WorkflowPage', () => {
  let component: WorkflowPage;
  let fixture: ComponentFixture<WorkflowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowPage ],
      imports: [ComponentsModule, MaterialModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
