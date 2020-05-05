import { Component, OnInit } from '@angular/core';
import {
  GetInstrumentsGQL,
  Instrument,
  GetInstrumentsQuery,
} from '../../graphql/generated/feelback.graphql';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'feelback-doctor-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
})
export class InstrumentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private instrumentService: GetInstrumentsGQL,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.currentID = params.get('instrument');
      this.instrument$ = this.instrumentService.fetch();
    });
  }

  public currentID: string;
  public instrument: Instrument;
  public instrument$: Observable<ApolloQueryResult<GetInstrumentsQuery>>;

  ngOnInit(): void {}
}
