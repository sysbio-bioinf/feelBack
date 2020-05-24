import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../../../../services/instrument.service';
import { Observable } from 'rxjs';
import { Instrument } from '../../../../graphql/generated/feelback.graphql';
import { Patient } from '../../../../models/Patient';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'apps/feelback-doctor/src/app/services/patient.service';

@Component({
  selector: 'feelback-doctor-instruments',
  templateUrl: './instruments.page.html',
  styleUrls: ['./instruments.page.scss'],
})
export class InstrumentsPage implements OnInit {
  constructor(
    private patientService: PatientService,
    private instrumentService: InstrumentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe((params) => {
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
  public instruments$: Observable<Instrument[]>;
  public instruments: Instrument[];

  ngOnInit(): void {
    this.instruments$ = this.instrumentService.getInstruments();
  }

  public selectInstrument(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  private navigateToPatientErrorPage() {
    this.router.navigate(['error'], {
      queryParams: {},
      queryParamsHandling: 'merge',
      state: {
        code: 404,
        entity: 'patient',
        callbackUrl: '/app/patients',
      },
    });
  }
}
