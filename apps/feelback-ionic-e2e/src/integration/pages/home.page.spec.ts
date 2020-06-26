import { BrowserLanguageEN, LargeMobileDevice } from '@cancerlog/util/testing';

describe('Home Page', () => {
  let testingDevice: LargeMobileDevice;

  before(() => {
    testingDevice = new LargeMobileDevice();
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);

    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-login-anonymous]').click();
    cy.wait(300);
  });

  it('should open the home page', () => {
    cy.url().should('contain', '/main/home');
    cy.get('[data-cy=header-title]').should('contain', 'FeelBack');
  });

  it.only('should open the menu', () => {
    cy.get('[data-cy=menu-pane]').should('not.be.visible');

    cy.get('[data-cy=content-pane').swipe('left', 'right');
    cy.wait(300);

    cy.get('[data-cy=menu-pane]').should('be.visible');
  });
});
