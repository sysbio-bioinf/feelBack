import { Component, OnInit } from '@angular/core';
import {
  GetInstrumentsGQL,
  Instrument,
  GetInstrumentsQuery,
} from '../../graphql/generated/feelback.graphql';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from '../../services/instrument.service';

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
      this.instrument$ = this.instrumentService.fetch();
    });
  }

  public instrumentId: string;
  public instrument: Instrument;
  public instrument$: Observable<ApolloQueryResult<GetInstrumentsQuery>>;

  ngOnInit(): void {}
}
