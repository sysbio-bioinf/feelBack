import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../../models/patient.model';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'feelback-doctor-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss'],
})
export class PatientInfoComponent implements OnInit {
  constructor(public commonService: CommonService) {}

  @Input() patient: Patient;

  ngOnInit(): void {}
}
