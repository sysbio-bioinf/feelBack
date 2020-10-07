import {
  BrowserLanguageEN,
  LargeMobileDevice,
  BrowserLanguageDE,
} from '@feelback-app/util/testing';

describe('Settings Page', () => {
  const testingDevice = new LargeMobileDevice();

  before(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-login-anonymous]').click();
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Settings]').click();
    cy.wait(300);
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
  });

  it('should display the correct header-title and url', () => {
    cy.get('[data-cy=header-title]')
      .invoke('text')
      .should('contain', 'Settings');
    cy.url().should('contain', 'settings');
  });

  it('should only show the menu button in the header bar', () => {
    cy.get('[data-cy=header-language-button]').should('not.be.visible');
    cy.get('[data-cy=header-back]').should('not.be.visible');
    cy.get('[data-cy=header-menu]').should('exist').and('be.visible');
  });

  it('Should contain the "change language" entry', () => {
    cy.get('[data-cy=settings-language-item]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-cy=settings-language-icon]')
      .should('exist')
      .and('be.visible')
      .should('have.attr', 'name')
      .and('include', 'language-outline');
    //label should not be "visible" because the button from the select covers the element. (That's why it's possible to trigger the select by clicking on the label)
    cy.get('[data-cy=settings-language-label]')
      .should('exist')
      .and('not.be.visible')
      .invoke('text')
      .should('have.length.gt', 0);
    // the first select option should be German and the second English
    cy.get('[data-cy=settings-language-select]').within(() => {
      cy.get('ion-select-option')
        .should('have.length.gt', 1)
        .first()
        .invoke('text')
        .should('contain', 'Deutsch');
      cy.get('ion-select-option')
        .first()
        .next()
        .invoke('text')
        .should('contain', 'English');
    });
  });

  it('should be able change the currently used language', () => {
    cy.get('[data-cy=settings-language-select]').click();
    cy.get('.alert-radio-group')
      .should('be.visible')
      // select German
      .children()
      .first()
      .click();
    cy.get('.alert-button-group')
      .should('be.visible')
      .within(() => {
        cy.get('button').first().invoke('text').should('contain', 'Cancel');
        cy.get('button').last().invoke('text').should('contain', 'OK');
        cy.get('button').last().click();
      });
    cy.wait(300);
    cy.get('[data-cy=header-title]')
      .invoke('text')
      .should('contain', 'Einstellungen');
    cy.get('[data-cy=settings-language-select]').click();
    cy.get('.alert-radio-group')
      .should('be.visible')
      // select English
      .children()
      .first()
      .next()
      .click();
    cy.get('.alert-button-group')
      .should('be.visible')
      .within(() => {
        cy.get('button').first().invoke('text').should('contain', 'Abbrechen');
        cy.get('button').last().invoke('text').should('contain', 'OK');
        cy.get('button').last().click();
      });
  });
});
