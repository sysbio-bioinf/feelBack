import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { AppComponent } from './app.component';
import { ComponentsModule } from './modules/components.module';
import { GraphQLModule } from './modules/graphql.module';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        GraphQLModule,
        HttpClientModule,
        ComponentsModule,
        TranslateTestingModule.withTranslations('en', {}),
      ],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  it('should create the current year', () => {
    expect(app.year).toBe(new Date().getFullYear());
  })

  it('should have title', () => {
    expect(app.title).toBe('feelback-web');
  })

});
