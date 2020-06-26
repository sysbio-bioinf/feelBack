import { LargeMobileDevice } from '@cancerlog/util/testing';

describe('Start Page', () => {
  let testingDevice: LargeMobileDevice;

  before(() => {
    testingDevice = new LargeMobileDevice();
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);

    cy.visitMobile('/');
    cy.get('[data-cy=button-login-code]').click();
    cy.wait(300);
  });

  it('should show the login page', () => {
    cy.get('[data-cy=header-title]').should('contain', 'Login');
  });

  it('should unlock the LOGIN button', () => {
    cy.get('[data-cy=button-login').should('have.class', 'button-disabled');

    cy.get('[data-cy=input-pseudonym]').type('pseudonym');
    cy.wait(300);

    cy.get('[data-cy=button-login').should('not.have.class', 'button-disabled');
  });
});
