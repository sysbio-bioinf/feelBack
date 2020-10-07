import {
  BrowserLanguageEN,
  LargeMobileDevice,
  BrowserLanguageDE,
} from '@feelback-app/util/testing';

describe('Privacy page', () => {
  const testingDevice = new LargeMobileDevice();

  before(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-login-anonymous]').click();
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Privacy]').click();
    cy.wait(300);
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
  });

  it('should display the correct header-title and url', () => {
    cy.get('[data-cy=header-title]')
      .invoke('text')
      .should('contain', 'Privacy');
    cy.url().should('contain', 'privacy');
  });

  it('should only show the menu button in the header bar', () => {
    cy.get('[data-cy=header-language-button]').should('not.be.visible');
    cy.get('[data-cy=header-back]').should('not.be.visible');
    cy.get('[data-cy=header-menu]').should('exist').and('be.visible');
  });

  it('should load the privacy md file and show the content', () => {
    cy.get('[data-cy=privacy-card-content]').should('exist').and('be.visible');
    cy.get('[data-cy=privacy-md-content]')
      .should('exist')
      .children()
      .should('have.length.gt', 0);
    cy.get('[data-cy=privacy-md-content]')
      .should('exist')
      .children()
      .first()
      .should('contain', 'Privacy');
  });
});
