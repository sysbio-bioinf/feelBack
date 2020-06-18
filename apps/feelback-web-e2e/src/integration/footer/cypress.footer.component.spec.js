const { eq } = require('lodash');

describe('Testing the footer component of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.scrollTo('bottom');
  });

  it('should display the footer bar', () => {
    cy.get('[data-cy=footer-section]').should('be.visible');
    cy.get('[data-cy=footer-section]').children().should('have.length', 2);
  });

  it('should display the correct copyright text', () => {
    cy.get('[data-cy=footer-copyright] small').then(($small) => {
      const text = $small.text();
      const year = new Date().getFullYear();
      expect(text).to.contain(year);
      expect(text).to.contain('Copyright');
      expect(text).to.contain(
        'All Rights Reserved. Ulm University. Developed by Johannes Schobel. Ulm University',
      );
    });
    cy.get('[data-cy=footer-copyright] small a')
      .should('have.attr', 'href')
      .and('equal', 'https://www.uni-ulm.de');
  });

  it('should show links', () => {
    cy.get('[data-cy=footer-links]').children().should('have.length', 4);
    cy.get('[data-cy=footer-links] a').eq(0).should('have.text', 'Press');
    cy.get('[data-cy=footer-links] a')
      .eq(0)
      .should('have.attr', 'href')
      .and('include', '#');
    cy.get('[data-cy=footer-links] a').eq(1).should('have.text', 'Terms');
    cy.get('[data-cy=footer-links] a')
      .eq(1)
      .should('have.attr', 'href')
      .and('include', '#');
    cy.get('[data-cy=footer-links] a').eq(2).should('have.text', 'Privacy');
    cy.get('[data-cy=footer-links] a')
      .eq(2)
      .should('have.attr', 'href')
      .and('include', '#');
    cy.get('[data-cy=footer-links] a').eq(3).should('have.text', 'Imprint');
    cy.get('[data-cy=footer-links] a')
      .eq(3)
      .should('have.attr', 'href')
      .and('include', '#');
  });
});
