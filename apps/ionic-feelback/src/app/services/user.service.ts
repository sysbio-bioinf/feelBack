import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  pseudonym: string;
  loggedIn = false;
  person: any; // TODO Change this to actual PERSON Type

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
