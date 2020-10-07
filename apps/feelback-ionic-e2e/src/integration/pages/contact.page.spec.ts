import {
  BrowserLanguageEN,
  LargeMobileDevice,
  BrowserLanguageDE,
} from '@feelback-app/util/testing';
import { forEach } from 'cypress/types/lodash';

describe('Contact page', () => {
  const testingDevice = new LargeMobileDevice();

  before(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-login-anonymous]').click();
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Contact]').click();
    cy.wait(300);
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
  });

  it('should display the correct header-title and url', () => {
    cy.get('[data-cy=header-title]')
      .invoke('text')
      .should('contain', 'Legal Notice');
    cy.url().should('contain', 'imprint');
  });

  it('should only show the menu button in the header bar', () => {
    cy.get('[data-cy=header-language-button]').should('not.be.visible');
    cy.get('[data-cy=header-back]').should('not.be.visible');
    cy.get('[data-cy=header-menu]').should('exist').and('be.visible');
  });

  it('should display the contact information', () => {
    cy.get('[data-cy=contact-title]')
      .should('be.visible')
      .invoke('text')
      .should('contain', 'Contact');
    cy.get('[data-cy=contact-list]').children().should('have.length', 4);
    cy.get('[data-cy=contact-address-icon]')
      .should('be.visible')
      .and('have.attr', 'name')
      .and('contain', 'map-outline');
    cy.get('[data-cy=contact-address-organization]')
      .invoke('text')
      .should('contain', 'Ulm University');
    cy.get('[data-cy=contact-phone-icon]')
      .should('be.visible')
      .and('have.attr', 'name')
      .and('contain', 'call-outline');
    cy.get('[data-cy=contact-phone]')
      .invoke('text')
      .should('contain', '+49 / (0)731');
    cy.get('[data-cy=contact-fax-icon]')
      .should('be.visible')
      .and('have.attr', 'name')
      .and('contain', 'print-outline');
    cy.get('[data-cy=contact-fax]')
      .invoke('text')
      .should('contain', '+49 / (0)731');
    cy.get('[data-cy=contact-email-icon]')
      .should('be.visible')
      .and('have.attr', 'name')
      .and('contain', 'mail-open-outline');
    cy.get('[data-cy=contact-email]')
      .invoke('text')
      .should('contain', 'hans.kestler@uni-ulm.de');
    cy.get('[data-cy=team-title]').invoke('text').should('contain', 'Team');
    cy.get('[data-cy=team-list]').children().should('have.length.gt', 3);
    cy.get('[data-cy=team-list]')
      .children()
      .then((team) => {
        const teamSize = Cypress.$(team).length;
        for (const member of team) {
          cy.wrap(member).within(() => {
            cy.get('p')
              .invoke('text')
              .should('have.length.gt', 1)
              .and('not.contain', '{{');
          });
        }
      });
  });
});
