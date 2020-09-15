import {
  BrowserLanguageEN,
  LargeMobileDevice,
  BrowserLanguageDE,
} from '@feelback-app/util/testing';

describe('Organization Page (list-page, card-component, detail-page)', () => {
  const testingDevice = new LargeMobileDevice();

  before(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-login-anonymous]').click();
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Organizations]').click();
    cy.wait(300);
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
  });

  it('Should display the correct header-title', () => {
    cy.get('[data-cy=header-title]').should('have.text', 'Organizations');
  });

  it('Should navigate to the list of organizations.', () => {
    cy.url().should('contain', 'organizations');
  });

  it('Should not contain the "emptyTemplate"', () => {
    cy.get('[data-cy=organization-empty-template]').should('not.exist');
  });

  it('Should contain at least one organization in the list', () => {
    cy.get('[data-cy=organization-card]').should('have.length.gte', 1);
  });

  it('every organization card should contain valid text', () => {
    cy.get('[data-cy=organization-card]').each(($el) => {
      cy.wrap($el).within(($organizationCard) => {
        cy.get('[data-cy=organization-logo]')
          .shadow()
          .children()
          .should('have.length', 1)
          .and('have.attr', 'src');
        // .and('include', 'http');
        cy.get('[data-cy=organization-type]')
          .invoke('text')
          .should('have.length.gt', 5);
        cy.get('[data-cy=organization-name]')
          .invoke('text')
          .should('have.length.gt', 5);
        cy.get('[data-cy=organization-description]')
          .invoke('text')
          .should('have.length.gt', 5)
          // 205 because the text is shortened to 200 chars and '...' gets added as well as two white spaces -> 200 + 5
          .and('have.length.lte', 205);
      });
    });
  });

  it('every organization card should have a corresponding detail page', () => {
    cy.get('[data-cy=organization-card-component]').each(($el) => {
      cy.wrap($el).click();
      cy.get('[data-cy=organization-detail-header-title]')
        .invoke('text')
        .should('contain', 'Detail');
      cy.get('[data-cy=organization-detail-logo')
        .shadow()
        .children()
        .and('have.length', 1)
        .and('have.attr', 'src');
      cy.get('[data-cy=organization-detail-type]')
        .invoke('text')
        .should('have.length.gt', 5);
      cy.get('[data-cy=organization-detail-name]')
        .invoke('text')
        .should('have.length.gt', 5);
      cy.get('[data-cy=organization-detail-description]')
        .invoke('text')
        .should('have.length.gt', 5);
      cy.get('[data-cy=organization-detail-information-list]')
        .children()
        .should('have.length.gt', 0);
      cy.get('[data-cy=organization-detail-address-icon]')
        .should('have.attr', 'ng-reflect-name')
        .and('contain', 'map-outline');
      cy.get('[data-cy=organization-detail-address]')
        .invoke('text')
        .should('have.length.gt', 5);
      cy.get('[data-cy=organization-detail-phone-icon]')
        .should('have.attr', 'ng-reflect-name')
        .and('contain', 'call-outline');
      cy.get('[data-cy=organization-detail-phone]')
        .invoke('text')
        .should('have.length.gt', 5)
        .and('contain', '+');
      cy.get('[data-cy=organization-detail-email-icon]')
        .should('have.attr', 'ng-reflect-name')
        .and('contain', 'mail-open-outline');
      cy.get('[data-cy=organization-detail-email]')
        .invoke('text')
        .should('have.length.gt', 5)
        .and('contain', '@');
      cy.get('[data-cy=organization-detail-url-icon]')
        .should('have.attr', 'ng-reflect-name')
        .and('contain', 'globe-outline');
      cy.get('[data-cy=organization-detail-url]')
        .invoke('text')
        .should('have.length.gt', 5)
        .and('contain', '.');
      cy.get('[data-cy=header-back]').click();
    });
  });

  // TODO continue with testing of the information element (toast/ion-label)
});
