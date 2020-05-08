import { Component, OnInit } from '@angular/core';
import {
  GetInstrumentsGQL,
  Instrument,
} from '../../graphql/generated/feelback.graphql';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from '../../services/instrument.service';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'feelback-doctor-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
})
export class InstrumentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instrumentService: InstrumentService,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.instrumentId = params.get('instrument');

      if (!this.instrumentService.checkIfInstrumentExists(this.instrumentId)) {
        this.router.navigate(['instrument-not-found', this.instrumentId]);
      }

      this.instrument$ = this.instrumentService.getInstrumentById(
        this.instrumentId,
      );
    });
  }

  public instrumentId: string;
  public instrument$: Observable<Instrument>;
  public error: boolean;

  ngOnInit(): void {}
}
