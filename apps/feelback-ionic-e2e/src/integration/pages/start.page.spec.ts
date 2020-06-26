import { LargeMobileDevice } from '@cancerlog/util/testing';

describe('Start Page', () => {
  let testingDevice: LargeMobileDevice;

  before(() => {
    testingDevice = new LargeMobileDevice();
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);

    cy.visitMobile('/');
  });

  it('should show the login page', () => {
    cy.title().should('eq', 'FeelBack');
    cy.url().should('contain', '/start');

    cy.get('[data-cy=header-title]').should('contain', 'FeelBack');
  });

  it('should check, if the login buttons exists', () => {
    cy.get('[data-cy=button-login-code]').should('exist');
    cy.get('[data-cy=button-login-anonymous]').should('exist');
  });

  it('should check, if the tutorial button exists', () => {
    cy.get('[data-cy=button-tutorial]').should('exist');
    cy.get('[data-cy=button-tutorial]').should('contain.text', 'Open Tutorial');
  });

  it('should redirect to the home page on anonymous login', () => {
    cy.get('[data-cy=button-login-anonymous]').click();
    cy.wait(300);

    cy.url().should('not.contain', '/start');
    cy.url().should('contain', '/home');

    cy.get('[data-cy=header-title]').should('contain', 'FeelBack');
  });

  it('should redirect to the code page on code login', () => {
    cy.get('[data-cy=button-login-code]').click();
    cy.wait(300);

    cy.url().should('not.contain', '/start');
    cy.url().should('contain', '/auth/login');

    cy.get('[data-cy=header-title]').should('contain', 'Login');
  });
});
