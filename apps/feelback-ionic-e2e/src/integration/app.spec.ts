import { getGreeting } from '../support/app.po';

describe('feelback-ionic', () => {
  beforeEach(() => cy.visit('/'));

  it('should show the login page', () => {
    cy.get('ion-button').contains('Login');
  });
});
