import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonService } from '../../services/common.service';
import { slideInAnimation } from './slide-in-animations';

@Component({
  selector: 'feelback-doctor-app-layout',
  templateUrl: './app.layout.html',
  styleUrls: ['./app.layout.scss'],
  animations: [slideInAnimation],
})
export class AppLayout implements OnInit {
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
      path: '/app/patients',
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
    this.steps[1].path = '/app/patients/' + splittedUrl[3] + '/instruments';
    this.steps[2].path =
      '/app/patients/' +
      splittedUrl[3] +
      '/instruments/' +
      splittedUrl[5] +
      '/screenings';
  }

  private setDisabled(splittedUrl: Array<string>) {
    if (splittedUrl.length === 3) {
      this.stepThreshold = 0;
    } else if (splittedUrl.length === 5) {
      this.stepThreshold = 1;
    } else if (splittedUrl.length === 7) {
      this.stepThreshold = 2;
    } else if (splittedUrl.length === 8) {
      this.stepThreshold = 3;
    }
  }
}
