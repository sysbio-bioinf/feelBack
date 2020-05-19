import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Error } from '../../models/Error';
import { Location } from '@angular/common';

@Component({
  selector: 'feelback-doctor-error-page',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {
  constructor(private router: Router, private location: Location) {
    const nav = this.router.getCurrentNavigation().extras;
    if (nav.state) {
      this.error = new Error(nav.state);
    } else {
      this.error = new Error({
        code: 404,
        entity: 'page',
      });
    }
  }

  public error: Error;

  ngOnInit(): void {}

  public navigateToCallbackUrl() {
    if (this.error.callbackUrl) {
      this.router.navigateByUrl(this.error.callbackUrl);
    } else {
      this.location.back();
    }
  }
}
