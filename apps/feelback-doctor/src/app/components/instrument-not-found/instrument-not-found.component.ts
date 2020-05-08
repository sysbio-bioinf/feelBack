import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'feelback-doctor-instrument-not-found',
  templateUrl: './instrument-not-found.component.html',
  styleUrls: ['./instrument-not-found.component.scss'],
})
export class InstrumentNotFoundComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public commonService: CommonService,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.instrumentId = params.get('instrument');
    });
  }

  public instrumentId: string;

  ngOnInit(): void {}

  public showPatients() {
    this.router.navigateByUrl('/patients');
  }
}
