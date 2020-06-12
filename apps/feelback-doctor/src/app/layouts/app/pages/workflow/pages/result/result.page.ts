import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'apps/feelback-doctor/src/app/services/common.service';
import { PatientService } from 'apps/feelback-doctor/src/app/services/patient.service';
import { InstrumentService } from 'apps/feelback-doctor/src/app/services/instrument.service';
import { ScreeningService } from 'apps/feelback-doctor/src/app/services/screening.service';
import { Patient } from 'apps/feelback-doctor/src/app/models/patient.model';
import { Instrument, Screening } from 'apps/feelback-doctor/src/app/graphql/generated/feelback.graphql';

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
    private screeningService: ScreeningService
  ) {}

  public patient$: Observable<Patient>;
  public instrument$: Observable<Instrument>;
  public screening$: Observable<Screening>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patient$ = this.patientService.getPatientById(params.get('patient'));
      this.instrument$ = this.instrumentService.getInstrumentById(
        params.get('instrument'),
      );

      const screeningId = params.get('screening');
      if (!this.screeningService.checkIfScreeningExists(screeningId)) {
        this.navigateToErrorPage();
      } else {
        this.screening$ = this.screeningService.getScreening('8475a985-2ba8-4b2c-b0b1-88560ff76eeb');
      }
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
