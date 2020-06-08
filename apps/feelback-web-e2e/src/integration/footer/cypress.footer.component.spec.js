describe('Testing the footer component of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.scrollTo('bottom');
  });

  it('should display the footer bar', () => {
    cy.get('feelback-web-footer > .my-5').should('be.visible');
    cy.get('feelback-web-footer > .my-5').children().should('have.length', 2);
  });


  it('should display the correct copyright text', () => {
    cy.get('feelback-web-footer > .my-5 > .mb-2').then(($small) => {
      const text = $small.text();
      const year = new Date().getFullYear();
      expect(text).to.contain(year);
      expect(text).to.contain("Copyright");
      expect(text).to.contain("All Rights Reserved. Ulm University. Developed by Johannes Schobel. Ulm University")
    });
    cy.get('.mb-2 > small > a').should('have.attr', 'href').and('equal', 'https://www.uni-ulm.de')
  });


  it('should show links', () => {
    cy.get('.my-5 > :nth-child(2)')
      .children()
      .should('have.length',4);
      cy.get('.my-5 > :nth-child(2) > :nth-child(1)').should('have.text', 'Press');
      cy.get('.my-5 > :nth-child(2) > :nth-child(2)').should('have.text', 'Terms');
      cy.get('.my-5 > :nth-child(2) > :nth-child(3)').should('have.text', 'Privacy');
      cy.get('.my-5 > :nth-child(2) > :nth-child(4)').should('have.text', 'Imprint');
  });


});