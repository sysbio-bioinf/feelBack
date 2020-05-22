import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feelback-doctor-patient-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  public panelOpenState = false;
  public options = [{ value: 'over' }, { value: 'under' }];

  ngOnInit(): void {}
}
