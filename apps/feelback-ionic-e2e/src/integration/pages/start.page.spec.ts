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
});
