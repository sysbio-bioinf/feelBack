import {
  Component,
  OnInit,
  Input,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { availableLanguages } from '../../constants/languages.constants';

@Component({
  selector: 'feelback-web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() hideMenuItems?: boolean;

  @Input() activeNavItem?: String;

  constructor(readonly translateService: TranslateService) {}

  avLanguages = availableLanguages;
  menuClass = '';

  smallScreen = false;
  menuOpen = false;
  currentActive = 'home';

  languageDropdownSelection: { short: string; full: string }[] = [
    { short: 'en', full: 'English' },
    { short: 'de', full: 'Deutsch' },
  ];

  ngOnInit(): void {
    if (window.innerWidth <= 992) {
      this.smallScreen = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const change = changes[propName];
      const curVal = change.currentValue;
      this.currentActive = curVal;
    }
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    // set css class for navbar
    if (windowScroll >= 50) {
      if (this.menuClass.includes('menu-is-open')) {
        this.menuClass = 'menu-is-open is-scrolling';
      } else {
        this.menuClass = 'is-scrolling';
      }
    } else {
      if (this.menuClass.includes('menu-is-open')) {
        this.menuClass = 'menu-is-open';
      } else {
        this.menuClass = '';
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 992) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }

  toggleMenu() {
    if (this.smallScreen) {
      if (!this.menuOpen) {
        this.menuOpen = true;
        if (this.menuClass !== 'is-scrolling') {
          this.menuClass = 'menu-is-open';
        } else {
          this.menuClass += ' menu-is-open';
        }
      } else {
        this.menuOpen = false;
        if (this.menuClass.includes('is-scrolling')) {
          this.menuClass = 'is-scrolling';
        } else {
          this.menuClass = '';
        }
      }
    }
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  switchLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
