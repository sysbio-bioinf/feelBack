import {
  BrowserLanguageEN,
  LargeMobileDevice,
  BrowserLanguageDE,
} from '@feelback-app/util/testing';

describe('FAQs page', () => {
  const testingDevice = new LargeMobileDevice();

  before(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-login-anonymous]').click();
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-FAQs]').click();
    cy.wait(300);
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
  });

  it('should display the correct header-title and url', () => {
    cy.get('[data-cy=header-title]').invoke('text').should('contain', 'FAQs');
    cy.url().should('contain', 'faqs');
  });

  it('should only show the menu button in the header bar', () => {
    cy.get('[data-cy=header-language-button]').should('not.be.visible');
    cy.get('[data-cy=header-back]').should('not.be.visible');
    cy.get('[data-cy=header-menu]').should('exist').and('be.visible');
  });

  it('Temporary test (until FAQs are displayed)', () => {
    cy.get('[data-cy=faq-list-empty]').should('exist');
    cy.get('[data-cy=faq-list]').should('not.exist');
    cy.get('[data-cy=faq-list-empty]').within(() => {
      cy.get('[data-cy=empty-content-image]')
        .shadow()
        .children()
        .should('have.length', 1)
        .should('be.visible')
        .and('have.attr', 'src')
        .and('contain', 'empty.svg');
      cy.get('[data-cy=empty-content-title]').within(() => {
        cy.get('h2')
          .should('be.visible')
          .invoke('text')
          .should('have.length.gt', 1);
      });

      cy.get('[data-cy=empty-content-text]').within(() => {
        cy.get('p')
          .should('be.visible')
          .invoke('text')
          .should('have.length.gt', 1);
      });
    });
  });

  // TODO: write more tests as soon as the FAQs are displayed
});
