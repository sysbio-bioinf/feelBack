import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from '../../../../../../services/instrument.service';
import { Patient } from '../../../../../../models/patient.model';
import { Instrument } from '../../../../../../graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-doctor-screenings',
  templateUrl: './screenings.page.html',
  styleUrls: ['./screenings.page.scss'],
})
export class ScreeningsPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instrumentService: InstrumentService,
  ) {}

  public patientId: string;
  public patient$: Observable<Patient>;
  public instrumentId: string;
  public instrument$: Observable<Instrument>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
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
    const url_mod = url.substring(0, url.lastIndexOf('/'));
    return url_mod.substring(0, url_mod.lastIndexOf('/'));
  }
}
