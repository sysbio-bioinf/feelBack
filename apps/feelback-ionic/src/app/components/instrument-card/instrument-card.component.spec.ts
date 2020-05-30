import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstrumentCardComponent } from './instrument-card.component';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NgStringPipesModule } from 'ngx-pipes';

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
        NgStringPipesModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentCardComponent);
    component = fixture.componentInstance;
    component.instrument = {id: '', description: '', name: '', type: '', payload: {}, changelog: '', image: '', rules: []};
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
