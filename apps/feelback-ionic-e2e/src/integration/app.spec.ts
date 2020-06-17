import { getGreeting } from '../support/app.po';

describe('feelback-ionic', () => {
  beforeEach(() => {});

  it('should show the login page', () => {
    cy.visit('/');
    cy.title().should('eq', 'FeelBack');
  });

  it('should check, if the tutorial button exists', () => {
    cy.visit('/');
    cy.get('[data-cy=tutorial-button]').should('contain.text', 'Open Tutorial');
  });
});
