import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { ScreeningsPage } from './screenings.page';
import { ComponentsModule } from 'apps/feelback-doctor/src/app/components/components.module';

describe('ScreeningsPage', () => {
  let component: ScreeningsPage;
  let fixture: ComponentFixture<ScreeningsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule, RouterTestingModule],
      providers: [Apollo],
      declarations: [ScreeningsPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
