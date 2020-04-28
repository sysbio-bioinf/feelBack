import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../models/Patient';

@Component({
  selector: 'feelback-doctor-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {

  constructor() { }

  @Input() patient: Patient;

  ngOnInit(): void {
  }

}
