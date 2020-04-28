import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feelback-doctor-patient-filter',
  templateUrl: './patient-filter.component.html',
  styleUrls: ['./patient-filter.component.scss'],
})
export class PatientFilterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public panelOpenState = false;
  public options = [{ value: 'over' }, { value: 'under' }];
}
