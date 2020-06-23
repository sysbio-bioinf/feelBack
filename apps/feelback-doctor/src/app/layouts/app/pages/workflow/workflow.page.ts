import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonService } from '../../../../services/common.service';
import { filter } from 'rxjs/operators';
import { slideInAnimation } from './workflow.layout.animation';

@Component({
  selector: 'feelback-doctor-workflow',
  templateUrl: './workflow.page.html',
  styleUrls: ['./workflow.page.scss'],
  animations: [slideInAnimation],
})
export class WorkflowPage implements OnInit {

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
    this.steps[1].path = '/app/patients/' + splittedUrl[4] + '/instruments';
    this.steps[2].path =
      '/app/patients/' +
      splittedUrl[4] +
      '/instruments/' +
      splittedUrl[6] +
      '/screenings';
  }

  private setDisabled(splittedUrl: Array<string>) {
    if (splittedUrl.length === 4) {
      this.stepThreshold = 0;
    } else if (splittedUrl.length === 6) {
      this.stepThreshold = 1;
    } else if (splittedUrl.length === 8) {
      this.stepThreshold = 2;
    } else if (splittedUrl.length === 9) {
      this.stepThreshold = 3;
    }
  }

}
