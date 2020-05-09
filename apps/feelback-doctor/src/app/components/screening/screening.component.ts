import { Component, OnInit, Input } from '@angular/core';
import { ScreeningService } from '../../services/screening.service';
import { Observable } from 'rxjs';
import { Screening } from '../../models/Screening';

@Component({
  selector: 'feelback-doctor-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss'],
})
export class ScreeningComponent implements OnInit {
  constructor(private screeningService: ScreeningService) {}

  @Input() selectedScreening: string;
  @Input() payload: {};
  public screening$: Observable<Screening>;

  ngOnInit(): void {
    this.screening$ = this.screeningService.getScreening(
      this.selectedScreening,
    );
  }
}
