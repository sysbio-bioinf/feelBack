import {
  BrowserLanguageEN,
  LargeMobileDevice,
} from '@feelback-app/util/testing';

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

  it('should open the menu via swipe gesture and clicking', () => {
    cy.get('[data-cy=menu-pane]').should('not.be.visible');

    cy.get('[data-cy=content-pane]').swipe('left', 'right');
    cy.wait(300);

    cy.get('[data-cy=menu-pane]').should('be.visible');
    cy.get('[data-cy=content-pane]').swipe('right', 'left');
    cy.wait(300);
    cy.get('[data-cy=menu-pane]').should('not.be.visible');

    cy.get('[data-cy=header-menu]').click();
    cy.get('[data-cy=menu-pane]').should('be.visible');
  });

  it('should display at least one instrument', () => {
    cy.get('[data-cy=home-instrument-card]')
      .should('exist')
      .within(() => {
        cy.get('ion-card').should('have.length.gte', 1).and('be.visible');
      });
  });
});
