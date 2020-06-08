describe('Testing the header component of the FeelBack-web application.', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the header bar', () => {
    cy.url().should('include', '4200');
    cy.get('.navbar-brand').then(($text) => {
      expect($text).to.contain('FeelBack');
    });
    cy.contains('FeelBack').should('be.visible');
    cy.get('.nav-menu').contains('Download');
    cy.get('.navbar').should('be.visible');
    cy.get('.navbar-nav').children().should('have.length', 6);
  });

  it('should contain two languages', () => {
    cy.get('#dropdownEnSelect').should('not.be.visible');
    cy.get('.dropdown-menu').children().should('have.length',2);
    cy.get('#dropdownMenuButton').click();
    cy.get('#dropdownEnSelect').contains('English').and('be.visible');
    cy.get('#dropdownDeSelect').contains('Deutsch').and('be.visible');
    cy.get('#dropdownMenuButton').click();
    cy.get('#dropdownDeSelect').should('not.be.visible');
  });

  it('should change language', () => {
    cy.get('.navbar-nav > :nth-child(2) > .nav-link')
      .should('have.attr', 'href')
      .and('include', 'features')
    cy.get('.navbar-nav > :nth-child(4) > .nav-link').should('have.text', 'Contact');
    cy.get('.navbar-nav > :nth-child(2) > .nav-link').should('have.text', 'Features');
    cy.get('#dropdownMenuButton').click();
    cy.get('#dropdownDeSelect').click();
    cy.get('.navbar-nav > :nth-child(2) > .nav-link').should('have.text', 'Funktionen')
    cy.get('.navbar-nav > :nth-child(4) > .nav-link').should('have.text', 'Kontakt');
    cy.get('#dropdownMenuButton').click();
    cy.get('#dropdownEnSelect').click();
    cy.get('.navbar-nav > :nth-child(4) > .nav-link').should('have.text', 'Contact');
    cy.get('.navbar-nav > :nth-child(2) > .nav-link').should('have.text', 'Features');
  });

  it('should change the url', () => {
    cy.get('.navbar-nav > :nth-child(1) > .nav-link').click()
  });
});
