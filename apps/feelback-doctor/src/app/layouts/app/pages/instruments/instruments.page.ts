import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../../../../services/instrument.service';
import { Observable } from 'rxjs';
import { Instrument } from '../../../../graphql/generated/feelback.graphql';
import { Patient } from '../../../../models/Patient';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'feelback-doctor-instruments',
  templateUrl: './instruments.page.html',
  styleUrls: ['./instruments.page.scss'],
})
export class InstrumentsPage implements OnInit {
  constructor(
    private instrumentService: InstrumentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public patientId: string;
  public patient$: Observable<Patient>;
  public instruments$: Observable<Instrument[]>;
  public instruments: Instrument[];

  ngOnInit(): void {
    this.instruments$ = this.instrumentService.getInstruments();
  }

  public selectInstrument(id: string) {
    console.log(id);
    this.router.navigate([id], { relativeTo: this.route });
    console.log(this.router.url);
  }
}
