import {
  BrowserLanguageEN,
  LargeMobileDevice,
  BrowserLanguageDE,
} from '@feelback-app/util/testing';

describe('Profile page (anonymous)', () => {
  const testingDevice = new LargeMobileDevice();

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-login-anonymous]').click();
  });

  it("should not display the profile page for unauthenticated users and navigate to 'home'", () => {
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Settings]').click();
    cy.wait(300);
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Profile]').click();
    cy.wait(300);
    cy.url().should('not.contain', 'profile').and('contain', 'home');
  });

  it('should display a toast with information', () => {
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Profile]').click();
    cy.wait(300);
    cy.get('ion-toast')
      .shadow()
      .children()
      .within(() => {
        cy.get('.toast-message').should('contain', 'not logged in');
        cy.get('.toast-button-group').children().should('have.length', 2);
        cy.get('.toast-button-inner')
          .should('have.length', 2)
          .first()
          .invoke('text')
          .should('contain', 'Cancel');
        cy.get('.toast-button-inner')
          .last()
          .invoke('text')
          .should('contain', 'Login');
      });
  });

  it('should be possible to dissmiss the toast', () => {
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Profile]').click();
    cy.wait(300);
    // dissmiss via Cancel Button
    cy.get('ion-toast')
      .shadow()
      .children()
      .within(() => {
        cy.get('.toast-button-inner').first().click();
      });
    cy.get('ion-toast').should('not.exist');
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Profile]').click();
    cy.wait(300);
    // should not be able to dissmiss via Background
    cy.get('.ion-page > ion-content.md').click();
    cy.get('ion-toast').should('exist');
  });

  it('should be possible to navigate to the login page via the toast', () => {
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Profile]').click();
    cy.wait(300);
    cy.get('ion-toast')
      .shadow()
      .children()
      .within(() => {
        cy.get('.toast-button-inner').last().click();
      });
    cy.get('ion-toast').should('not.exist');
    cy.url().should('contain', 'login');
  });
});

describe("Profile page 'demodemo'", () => {
  const testingDevice = new LargeMobileDevice();

  before(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-login-pseudonym]').click();
    cy.get('[data-cy=input-pseudonym]').type('demodemo');
    cy.get('[data-cy=button-login]').click();
    cy.get('[data-cy=header-menu]').click();
    cy.wait(300);
    cy.get('[data-cy=menu-item-Profile]').click();
    cy.wait(300);
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
  });

  it('should display the profile page for authenticated users', () => {
    cy.url().should('contain', 'my/profile');
    cy.get('[data-cy=header-title]')
      .invoke('text')
      .should('contain', 'My Profile');
    cy.get('[data-cy=profile-pseudonym]').should('have.text', 'demodemo');
    // TODO further testing if the demodemo account does get more attributes
  });
});
