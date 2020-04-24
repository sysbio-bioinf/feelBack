import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaqListPage } from './faq-list.page';

describe('FaqListPage', () => {
  let component: FaqListPage;
  let fixture: ComponentFixture<FaqListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
