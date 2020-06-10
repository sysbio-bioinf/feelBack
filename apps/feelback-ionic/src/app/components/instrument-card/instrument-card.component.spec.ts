import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { NgStringPipesModule } from 'ngx-pipes';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { InstrumentCardComponent } from './instrument-card.component';

describe('InstrumentCardComponent', () => {
  let component: InstrumentCardComponent;
  let fixture: ComponentFixture<InstrumentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstrumentCardComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateTestingModule.withTranslations('en', {}),
        RouterTestingModule,
        FormsModule,
        NgStringPipesModule,
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(InstrumentCardComponent);
    component = fixture.componentInstance;
    component.instrument = {
      id: '',
      description: '',
      name: '',
      type: '',
      payload: {},
      changelog: '',
      image: '',
      rules: [],
    };

    expect(component).toBeTruthy();
  });
});
