import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'feelback-doctor-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public login() {
    this.router.navigateByUrl('/patient-list');
  }

}
