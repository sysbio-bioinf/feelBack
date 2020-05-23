import { Component, OnInit } from '@angular/core';
import { Screening } from '../../models/Screening';
import { Observable } from 'rxjs';
import { ScreeningService } from '../../services/screening.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { InstrumentService } from '../../services/instrument.service';
import { Instrument } from '../../graphql/generated/feelback.graphql';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'feelback-doctor-screening',
  templateUrl: './screening.page.html',
  styleUrls: ['./screening.page.scss']
})
export class ScreeningPage implements OnInit {

  constructor(
    private screeningService: ScreeningService,
    private route: ActivatedRoute,
    private router: Router,
    public commonService: CommonService,
    private patientService: PatientService,
    private instrumentService: InstrumentService,
  ) {
    this.route.parent.paramMap.subscribe((params) => {
      this.patientId = params.get('patient');
      if (!this.patientService.checkIfPatientExists(this.patientId)) {
        this.navigateToPatientErrorPage();
      } else {
        this.patient$ = this.patientService.getPatientById(this.patientId);
      }
    });
  }

  public patientId: string;
  public patient$: Observable<Patient>;
  public instrument$: Observable<Instrument>;
  public instrumentId: string;
  public screening$: Observable<Screening>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.screening$ = this.screeningService.getScreening(
        params.get('screening'),
      );
    });
    this.route.parent.paramMap.subscribe((params) => {
      this.instrumentId = params.get('instrument');

      this.instrument$ = this.instrumentService.getInstrumentById(
        this.instrumentId,
      );
    });
  }

  private navigateToPatientErrorPage() {
    this.router.navigate(['error'], {
      queryParams: {},
      queryParamsHandling: 'merge',
      state: {
        code: 404,
        entity: 'patient',
        callbackUrl: 'patients',
      },
    });
  }

}
