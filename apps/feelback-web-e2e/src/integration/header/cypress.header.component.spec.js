describe('Testing the header component of the FeelBack-web application.', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the header bar', () => {
    cy.get('[data-cy=header-title]').then(($text) => {
      expect($text).to.contain('FeelBack');
    });
    cy.get('[data-cy=header-title]').should('be.visible');
    cy.get('[data-cy=header-nav-menu]').contains('Download');
    cy.get('[data-cy=header-navbar]').should('be.visible');
    cy.get('[data-cy=header-navbar-nav]').children().should('have.length', 6);
    cy.get('[data-cy=header-navbar-toggler]').should('not.be.visible');
  });

  it('should contain two languages', () => {
    cy.get('#deDropdownSelect').should('not.be.visible');
    cy.get('#enDropdownSelect').should('not.be.visible');
    cy.get('[data-cy=header-navbar-dropdown-menu]')
      .children()
      .should('have.length', 2);
    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#enDropdownSelect').contains('English').and('be.visible');
    cy.get('#deDropdownSelect').contains('Deutsch').and('be.visible');
    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#deDropdownSelect').should('not.be.visible');
  });

  it('should change language', () => {
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(1)
      .should('have.attr', 'href')
      .and('include', 'features');
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(4)
      .should('have.attr', 'href')
      .and('include', 'contact');
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(1)
      .should('have.text', 'Features');
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(4)
      .should('have.text', 'Contact');
    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#deDropdownSelect').click();
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(1)
      .should('have.text', 'Funktionen');
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(4)
      .should('have.text', 'Kontakt');
    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#enDropdownSelect').click();
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(4)
      .should('have.text', 'Contact');
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(1)
      .should('have.text', 'Features');
  });

  it.only('should activate the nav-items', () => {
    cy.get('[data-cy=header-navbar-nav]')
      .find('.active')
      .should('have.length', 1);
    cy.get('[data-cy=header-navbar-home] a').should('have.class', 'active');
    cy.get('[data-cy=header-navbar-features] a').should(
      'not.have.class',
      'active',
    );
    cy.get('[data-cy=header-navbar-features] a').click();
    cy.get('[data-cy=header-navbar-home] a').should('not.have.class', 'active');
    cy.get('[data-cy=header-navbar-features] a').should('have.class', 'active');
    cy.get('[data-cy=header-navbar-gallery] a').click();
    cy.get('[data-cy=header-navbar-features] a').should(
      'not.have.class',
      'active',
    );
    cy.get('[data-cy=header-navbar-gallery] a').should('have.class', 'active');
    cy.get('[data-cy=header-navbar-download] a').click();
    cy.get('[data-cy=header-navbar-gallery] a').should(
      'not.have.class',
      'active',
    );
    cy.get('[data-cy=header-navbar-download] a').should('have.class', 'active');
    cy.get('[data-cy=header-navbar-contact] a').click();
    cy.get('[data-cy=header-navbar-download] a').should(
      'not.have.class',
      'active',
    );
    cy.get('[data-cy=header-navbar-contact] a').should('have.class', 'active');
  });

  it('should adapt the menu for small screens', () => {
    cy.viewport('iphone-x');
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
      .eq(4)
      .should('have.text', 'Contact');
    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#deDropdownSelect').click();
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(1)
      .should('have.text', 'Funktionen');
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(4)
      .should('have.text', 'Kontakt');

    cy.get('[data-cy=header-navbar-nav]').should('be.visible');

    cy.get('[data-cy=header-navbar-language-button]').click();
    cy.get('#enDropdownSelect').click();
    cy.get('[data-cy=header-navbar-nav] li a')
      .eq(4)
      .should('have.text', 'Contact');
    cy.get('[data-cy=header-navbar-toggler]').click();
    cy.wait(350);
  });
});
