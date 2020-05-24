import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonService } from '../../services/common.service';
import { FormBuilder } from '@angular/forms';
import { slideInAnimation } from './slideInAnimation';

@Component({
  selector: 'feelback-doctor-main-layout',
  templateUrl: './main.layout.html',
  styleUrls: ['./main.layout.scss'],
  // animations: [slideInAnimation],
})
export class MainLayout implements OnInit {
  constructor(private router: Router, private commonService: CommonService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const splittedUrl = event.urlAfterRedirects.split('/');
        this.setDisabled(splittedUrl);
        this.setPaths(splittedUrl);
      });
  }

  public steps = [
    {
      label: 'Choose patient',
      icon: this.commonService.icons.patient,
      path: '/patients',
    },
    {
      label: 'Choose instrument',
      icon: this.commonService.icons.instrument,
    },
    {
      label: 'Choose screening',
      icon: this.commonService.icons.screening,
    },
    {
      label: 'Analyze results',
      icon: 'image_search',
    },
  ];
  public stepThreshold: number;

  ngOnInit(): void {
    const splittedUrl = this.router.url.split('/');
    this.setDisabled(splittedUrl);
    this.setPaths(splittedUrl);
  }

  public prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  private setPaths(splittedUrl: Array<string>) {
    this.steps[1].path = '/patients/' + splittedUrl[2] + '/instruments';
    this.steps[2].path =
      '/patients/' +
      splittedUrl[2] +
      '/instruments/' +
      splittedUrl[4] +
      '/screenings';
  }

  private setDisabled(splittedUrl: Array<string>) {
    if (splittedUrl.length === 2) {
      this.stepThreshold = 0;
    } else if (splittedUrl.length === 4) {
      this.stepThreshold = 1;
    } else if (splittedUrl.length === 6) {
      this.stepThreshold = 2;
    } else if (splittedUrl.length === 7) {
      this.stepThreshold = 3;
    }
  }
}
