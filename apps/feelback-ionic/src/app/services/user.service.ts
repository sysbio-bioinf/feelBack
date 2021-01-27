import { Injectable } from '@angular/core';
import { GetPersonByPseudonymGQL } from '../graphql/generated/feelback.graphql';
import { Person } from '../models/person.model';
import { TranslatableError } from '../core/customErrors/translatableError';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  pseudonym: string;
  loggedIn = false;
  person: Person;

  constructor(
    private readonly getPersonByPseudonymService: GetPersonByPseudonymGQL,
  ) {}

  async loginWithPseudonym(pseudonym: string) {
    try {
      const person = await this.getPersonByPseudonymService
        .fetch({ pseudonym: pseudonym })
        .toPromise();
      this.person = person.data.personByPseudonym;
    } catch (err) {
      console.error(err);
      throw new TranslatableError('app.errors.services.user.pseudonymLogin');
    }

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
