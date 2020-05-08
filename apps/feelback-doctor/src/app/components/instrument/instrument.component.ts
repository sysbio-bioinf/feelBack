import { Component, OnInit } from '@angular/core';
import {
  GetInstrumentsGQL,
  Instrument,
} from '../../graphql/generated/feelback.graphql';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from '../../services/instrument.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'feelback-doctor-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
})
export class InstrumentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instrumentService: GetInstrumentsGQL,
    private instrumentServiceLocal: InstrumentService,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.instrumentId = params.get('instrument');
      const getInstrument = this.instrumentServiceLocal.getInstrumentById(
        this.instrumentId,
      );
      if (!getInstrument) {
        this.router.navigate(['instrument-not-found', this.instrumentId]);
      }
      this.instrument$ = this.instrumentService.fetch().pipe(
        map((data) => {
          const instruments = data.data.instruments.edges;
          if (instruments.length === 0) {
            this.error = true;
            return true;
          } else {
            return instruments[0].node;
          }
        }),
      );
    });
  }

  public instrumentId: string;
  public instrument$: Observable<Instrument | boolean>;
  public error: boolean;

  ngOnInit(): void {}
}
