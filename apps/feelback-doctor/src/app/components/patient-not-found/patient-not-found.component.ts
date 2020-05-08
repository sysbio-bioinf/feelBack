import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'feelback-doctor-patient-not-found',
  templateUrl: './patient-not-found.component.html',
  styleUrls: ['./patient-not-found.component.scss']
})
export class PatientNotFoundComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public commonService: CommonService) {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('patient');
    });
   }

   public patientId: string;

  ngOnInit(): void {
  }

  public showPatients() {
    this.router.navigateByUrl('/patients');
  }

}
