import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PatientService } from '../../../../../../services/patient.service';
import { InstrumentService } from '../../../../../..//services/instrument.service';
import { Patient } from '../../../../../..//models/patient.model';
import { Instrument } from '../../../../../..//models/instrument.model';
import { catchError } from 'rxjs/operators';


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
  ) {}

  public patientId: string;
  public patient$: Observable<Patient>;
  public instruments$: Observable<Instrument[]>;
  public instruments: Instrument[];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('patient');
      this.patient$ = this.patientService.getPatientById(params.get('patient'))
        .pipe(
          catchError(() => {
            this.navigateToErrorPage();
            return of(new Patient());
          }),
        );
    });
    this.instruments$ = this.instrumentService.getInstruments();
  }

  public selectInstrument(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  private navigateToErrorPage(): void {
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
