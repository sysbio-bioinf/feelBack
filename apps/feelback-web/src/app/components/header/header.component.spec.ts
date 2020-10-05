import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const ENGLISH_LANGUAGE = 'en';
  const GERMAN_LANGUAGE = 'de';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          TranslateTestingModule.withTranslations({
            [ENGLISH_LANGUAGE]: {},
            [GERMAN_LANGUAGE]: {},
          }).withDefaultLanguage(ENGLISH_LANGUAGE),
          MatMenuModule,
        ],
        declarations: [HeaderComponent],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    window = Object.assign(window, { innerWidth: 990 });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can switch language', () => {
    expect(component.translateService.getDefaultLang()).toBe('en');
    expect(component.avLanguages.length).toBe(2);
    component.switchLanguage('de');
    expect(component.translateService.currentLang).toBe('de');
  });

  it('should handle resize-events', () => {
    expect(component.smallScreen).toBe(true);
    expect(window.innerWidth).toBe(990);
    component.onResize();
    expect(component.smallScreen).toBe(true);
    window = Object.assign(window, { innerWidth: 1920 });
    component.onResize();
    expect(component.smallScreen).toBe(false);
  });

  it('should handle scroll-events', () => {
    window = Object.assign(window, { pageYOffset: 0 });
    component.handleScroll();
    expect(component.menuClass).toMatch('');
    window = Object.assign(window, { pageYOffset: 100 });
    component.handleScroll();
    expect(component.menuClass).toBe('is-scrolling');
    window = Object.assign(window, { pageYOffset: 0 });
    component.menuClass = 'menu-is-open';
    component.handleScroll();
    expect(component.menuClass).toMatch('menu-is-open');
    window = Object.assign(window, { pageYOffset: 100 });
    component.handleScroll();
    expect(component.menuClass).toBe('menu-is-open is-scrolling');
  });

  it('should toogle the menu', () => {
    expect(component.smallScreen).toBe(true);
    expect(component.menuOpen).toBe(false);
    expect(component.menuClass).toBe('');
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
    expect(component.menuClass).toBe('menu-is-open');
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
    expect(component.menuClass).toBe('');
    window = Object.assign(window, { pageYOffset: 100 });
    component.handleScroll();
    expect(component.menuClass).toBe('is-scrolling');
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
    expect(component.menuClass).toBe('is-scrolling menu-is-open');
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
    expect(component.menuClass).toBe('is-scrolling');
  });

  it('should scroll to top', () => {
    // const window = {
    //   pageXOffset: 0,
    //   pageYOffset: 0,
    //   scroll: jest.fn((x: number, y: number) => {
    //     console.log('CALLED');
    //     pageXOffset = x;
    //     pageYOffset = y;
    //   }),
    // };
    // window.pageXOffset = 0;
    // window.pageYOffset = 100;
    // // window = Object.assign(window, { pageYOffset: 100 });
    // component.scrollTop();
    // // window = Object.assign(window, { pageYOffset: 0 });
    // expect(window.pageYOffset).toBe(0);
  });
});
