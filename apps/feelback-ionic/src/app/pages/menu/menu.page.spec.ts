import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { MenuPage } from './menu.page';

describe('MenuPage', () => {
  let component: MenuPage;
  let fixture: ComponentFixture<MenuPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MenuPage],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          RouterTestingModule,
        ],
        providers: [TranslatePipe, Apollo],
      }).compileComponents();

      fixture = TestBed.createComponent(MenuPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the urls and pages of the app', () => {
    expect(component.appPages).toBeDefined();
    expect(component.contentPages).toBeDefined();
    for (const page of component.appPages) {
      expect(typeof page.title).toBe('string');
      expect(typeof page.url).toBe('string');
      expect(typeof page.icon).toBe('string');
    }

    for (const page of component.contentPages) {
      expect(typeof page.title).toBe('string');
      expect(typeof page.url).toBe('string');
      expect(typeof page.icon).toBe('string');
    }
  });

  it('should logout', () => {
    component.logout();
  });
});
