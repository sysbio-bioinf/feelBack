import { Injectable } from '@angular/core';
import { Person } from '@cancerlog/core/models/mobile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  pseudonym: string;
  loggedIn = false;
  person: Person;

  constructor() {}

  loginWithPseudonym(pseudonym: string) {
    // do something
    this.loggedIn = true;
    this.pseudonym = pseudonym;
  }

  loginAnonymous() {
    this.loggedIn = true;
    this.pseudonym = null;
    this.person = null;
  }

  logout() {
    this.loggedIn = false;
    this.pseudonym = null;
    this.person = null;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
