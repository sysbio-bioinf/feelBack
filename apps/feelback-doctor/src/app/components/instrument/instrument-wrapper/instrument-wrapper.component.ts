import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from '../../../graphql/generated/feelback.graphql';
import { Observable } from 'rxjs';
import { InstrumentService } from '../../../services/instrument.service';

@Component({
  selector: 'feelback-doctor-instrument-wrapper',
  templateUrl: './instrument-wrapper.component.html',
  styleUrls: ['./instrument-wrapper.component.scss'],
})
export class InstrumentWrapperComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instrumentService: InstrumentService,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.instrumentId = params.get('instrument');
      if (!this.instrumentService.checkIfInstrumentExists(this.instrumentId)) {
        this.navigateToErrorPage();
      } else {
        this.instrument$ = this.instrumentService.getInstrumentById(
          this.instrumentId,
        );
      }
    });
  }

  public instrumentId: string;
  public instrument$: Observable<Instrument>;

  ngOnInit(): void {}

  private navigateToErrorPage() {
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
