import { DesktopDevice } from '@feelback-app/util/testing';

const device = new DesktopDevice();

describe('Testing the logo component of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.viewport(device.width, device.height);
  });

  it('should display the logo component at the start page', () => {
    cy.visit('/');
    cy.get('[data-cy=logos-container]').should('be.visible');
    cy.get('[data-cy=logos-container]').children().should('have.length', 5);
    cy.get('[data-cy=logos-container]')
      .children()
      .first()
      .should('have.class', 'client-logo img-fluid');
    cy.get('[data-cy=logos-container]')
      .children()
      .next()
      .should('have.class', 'client-logo img-fluid');
  });

  it('should display the logo component at the legal notice page', () => {
    cy.visit('/imprint');
    cy.get('[data-cy=logos-container]').should('be.visible');
    cy.get('[data-cy=logos-container]').children().should('have.length', 5);
    cy.get('[data-cy=logos-container]')
      .children()
      .first()
      .should('have.class', 'client-logo img-fluid');
    cy.get('[data-cy=logos-container]')
      .children()
      .next()
      .should('have.class', 'client-logo img-fluid');
  });

  it('should display the logo component at the privacy page', () => {
    cy.visit('/privacy');
    cy.get('[data-cy=logos-container]').should('be.visible');
    cy.get('[data-cy=logos-container]').children().should('have.length', 5);
    cy.get('[data-cy=logos-container]')
      .children()
      .first()
      .should('have.class', 'client-logo img-fluid');
    cy.get('[data-cy=logos-container]')
      .children()
      .next()
      .should('have.class', 'client-logo img-fluid');
  });
});
