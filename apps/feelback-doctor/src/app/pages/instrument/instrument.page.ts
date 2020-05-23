import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient.service';
import { Instrument } from '../../graphql/generated/feelback.graphql';
import { InstrumentService } from '../../services/instrument.service';

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
    private instrumentService: InstrumentService,
  ) {
    

    this.route.parent.paramMap.subscribe((params) => {
      this.instrumentId = params.get('instrument');
      if (!this.instrumentService.checkIfInstrumentExists(this.instrumentId)) {
        this.navigateToInstrumentErrorPage();
      } else {
        this.instrument$ = this.instrumentService.getInstrumentById(
          this.instrumentId,
        );
      }
    });
  }

  public patientId: string;
  public patient$: Observable<Patient>;
  public instrumentId: string;
  public instrument$: Observable<Instrument>;

  ngOnInit(): void {}

  private navigateToInstrumentErrorPage() {
    this.router.navigate(['error'], {
      queryParams: {},
      queryParamsHandling: 'merge',
      state: {
        code: 404,
        entity: 'instrument',
        callbackUrl: this.buildCallbackUrl(),
      },
    });
  }

  private buildCallbackUrl() {
    const url = this.router.url;
    return url.substring(0, url.lastIndexOf('/'));
  }
}
