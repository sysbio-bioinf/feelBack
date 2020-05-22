import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Instrument } from '../../graphql/generated/feelback.graphql';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from '../../services/instrument.service';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'feelback-doctor-instrument-page',
  templateUrl: './instrument.page.html',
  styleUrls: ['./instrument.page.scss'],
})
export class InstrumentPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('patient');
      console.log(this.patientId);
      if (!this.patientService.checkIfPatientExists(this.patientId)) {
        this.navigateToErrorPage();
      } else {
        this.patient$ = this.patientService.getPatientById(this.patientId);
      }
    });
  }

  public patientId: string;
  public patient$: Observable<Patient>;

  ngOnInit(): void {}

  private navigateToErrorPage() {
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
