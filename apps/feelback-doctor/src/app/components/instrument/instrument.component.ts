import { Component, OnInit } from '@angular/core';
import { Instrument } from '../../graphql/generated/feelback.graphql';
import { Observable } from 'rxjs';
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

  ngOnInit(): void {}
}
