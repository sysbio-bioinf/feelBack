import { DesktopDevice } from '@feelback-app/util/testing';

const device = new DesktopDevice();

describe('Testing the Privacy Policy Page of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.viewport(device.width, device.height);
    cy.visit('/privacy');
  });

  it('should not display the menu items in the feelback-web-header', () => {
    cy.get('[data-cy=header-nav-menu]').should('be.visible');
    cy.get('[data-cy=header-title]').should('be.visible');
    cy.get('[data-cy=header-navbar-home]').should('not.be.visible');
    cy.get('[data-cy=header-navbar-features]').should('not.be.visible');
    cy.get('[data-cy=header-navbar-get-started]').should('not.be.visible');
    cy.get('[data-cy=header-navbar-gallery]').should('not.be.visible');
    cy.get('[data-cy=header-navbar-download]').should('not.be.visible');
    cy.get('[data-cy=header-navbar-contact]').should('not.be.visible');
    cy.get('[data-cy=header-navbar-language]').should('be.visible');
  });

  it('should show the privacy section', () => {
    cy.get('[data-cy=privacy-section]').should('be.visible');
    cy.get('[data-cy=privacy-title]')
      .invoke('text')
      .should('include', 'Privacy Policy');
  });

  it('should display the correct data', () => {
    cy.get('[data-cy=privacy-tagline]')
      .invoke('text')
      .should('have.have.length.greaterThan', 0);
    cy.get('[data-cy=privacy-note]')
      .invoke('text')
      .should('have.have.length.greaterThan', 0);
    cy.get('[data-cy=privacy-date]')
      .invoke('text')
      .then((text) => {
        expect(text).to.match(/Effective.*?20\d{2}/);
      });
  });

  it('should display the markdown section', () => {
    cy.get('[data-cy=privacy-markdown-section]').should('be.visible');
    cy.get('[data-cy=privacy-markdown-template]').should('exist');
    cy.get('[data-cy=privacy-markdown-template]')
      .children()
      .should('have.length.gte', 1);
  });

  it('should change language', () => {
    cy.get('[data-cy=privacy-title]')
      .invoke('text')
      .should('include', 'Privacy Policy');
    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#deDropdownSelect').click();
    cy.get('[data-cy=privacy-title]')
      .invoke('text')
      .should('include', 'Datenschutzerklärung');
    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#enDropdownSelect').click();
    cy.get('[data-cy=privacy-title]')
      .invoke('text')
      .should('include', 'Privacy Policy');
  });
});
