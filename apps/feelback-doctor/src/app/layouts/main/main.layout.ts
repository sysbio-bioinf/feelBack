import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'feelback-doctor-main-layout',
  templateUrl: './main.layout.html',
  styleUrls: ['./main.layout.scss'],
})
export class MainLayout implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        // console.log(event);
      });
  }

  public steps = [
    {
      title: 'Choose a patient',
      path: 'patients',
      form: this.formBuilder.group({
        value: ['', Validators.required],
      }),
    },
    {
      title: 'Choose an instrument',
      path: 'patients/a0316bbf-4719-4fe3-b979-f7aa17ef915e/instruments',
      formGroup: this.formBuilder.group({
        value: ['', Validators.required],
      }),
    },
    // { title: 'Choose a screening', path: 'patients', editable: false },
  ];

  ngOnInit(): void {}

  goto(path){
    this.router.navigateByUrl(path);
  }

  public go() {
    // this.patient.setValue("test");
    this.steps[0].form.setValue({ value: 'test' });
  }

  public selectionChanged($event) {}
}
