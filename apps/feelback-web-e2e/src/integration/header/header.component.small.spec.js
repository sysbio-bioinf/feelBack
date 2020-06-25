describe('(Small Screen) Testing the header component of the FeelBack-web application.', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/');
  });

  it('should adapt the menu for small screens', () => {
    cy.get('[data-cy=header-navbar-toggler]').should('be.visible');
    cy.get('[data-cy=header-navbar-nav]').should('not.be.visible');
    cy.get('[data-cy=header-navbar-toggler]').click();
    cy.wait(350);
    cy.get('[data-cy=header-navbar-nav]').should('be.visible');

    cy.get('[data-cy=header-navbar-home] a').should('have.class', 'active');
    cy.get('[data-cy=header-navbar-download] a').click();
    cy.wait(350);
    cy.get('[data-cy=header-navbar-home] a').should('not.have.class', 'active');
    cy.get('[data-cy=header-navbar-download] a').should('have.class', 'active');

    cy.get('[data-cy=header-navbar-nav]').should('not.be.visible');
    cy.get('[data-cy=header-navbar-toggler]').click();
    cy.wait(350);

    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(5)
      .should('have.text', 'Contact');
    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#deDropdownSelect').click();
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(1)
      .should('have.text', 'Funktionen');
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(5)
      .should('have.text', 'Kontakt');

    cy.get('[data-cy=header-navbar-nav]').should('be.visible');

    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#enDropdownSelect').click();
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(5)
      .should('have.text', 'Contact');
    cy.get('[data-cy=header-navbar-toggler]').click();
    cy.wait(350);
  });
});
