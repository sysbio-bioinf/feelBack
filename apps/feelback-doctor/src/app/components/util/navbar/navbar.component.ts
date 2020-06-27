import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'feelback-doctor-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router, private keycloakService: KeycloakService) {}

  ngOnInit(): void {}

  public logout() {
    this.keycloakService.logout();
  }
}
