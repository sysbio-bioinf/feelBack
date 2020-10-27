import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { EmptyComponent } from './empty.component';

describe('EmptyComponent', () => {
  let component: EmptyComponent;
  let fixture: ComponentFixture<EmptyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateTestingModule.withTranslations('en', {}),
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(EmptyComponent);
    component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
