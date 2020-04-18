import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  pseudonym: string;
  loggedIn = false;
  person: Person;

  constructor() {}

  loginWithPseudonym(pseudonym: string) {
    // TODO make GraphQL request to service

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
