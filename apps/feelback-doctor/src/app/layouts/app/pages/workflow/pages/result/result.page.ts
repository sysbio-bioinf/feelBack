import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../../../../services/common.service';
import { PatientService } from '../../../../../../services/patient.service';
import { InstrumentService } from '../../../../../../services/instrument.service';
import { ScreeningService } from '../../../../../../services/screening.service';
import { Patient } from '../../../../../../models/patient.model';
import {
  Instrument,
  Screening,
} from '../../../../../../graphql/generated/feelback.graphql';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'feelback-doctor-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public commonService: CommonService,
    private patientService: PatientService,
    private instrumentService: InstrumentService,
    private screeningService: ScreeningService,
  ) {}

  public patient$: Observable<Patient>;
  public instrument$: Observable<Instrument>;
  public screening$: Observable<Screening> | Observable<{}>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patient$ = this.patientService.getPatientById(params.get('patient'));
      this.instrument$ = this.instrumentService.getInstrumentById(
        params.get('instrument'),
      );
      this.screening$ = this.screeningService
        .getScreening(
          params.get('patient'),
          params.get('instrument'),
          params.get('screening'),
        )
        .pipe(
          catchError(() => {
            this.navigateToErrorPage();
            return of();
          }),
        );
    });
  }

  private navigateToErrorPage() {
    this.router.navigate(['error'], {
      queryParams: {},
      queryParamsHandling: 'merge',
      state: {
        code: 404,
        entity: 'screening',
        callbackUrl: this.buildCallbackUrl(),
      },
    });
  }

  private buildCallbackUrl() {
    const url = this.router.url;
    return url.substring(0, url.lastIndexOf('/'));
  }
}
