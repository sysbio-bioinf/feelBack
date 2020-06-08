import { cycleErrorMessage } from "graphql/validation/rules/NoFragmentCycles"

describe('Testing the startpage of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the headline', () => {
    cy.get('h1').should('have.text', 'FeelBack').and('be.visible');
    cy.get('p').first().invoke('text').should('include', 'description about FeelBack')
  
    cy.get('.img-holder > .img-fluid').should('have.attr', 'src').and('include', 'iphonex.png')
  });


  it('show five logos', () => {
    cy.get('.client-logos > .container').children().should('have.length', 5);
    cy.get('[data-cy=uniklinik-logo]').should('be.visible').and('have.attr', 'src').and('include', 'uniklinik-ulm.png');
    cy.get('[data-cy=uni-logo]').should('be.visible').and('have.attr', 'src').and('include', 'uni-ulm.svg');
    cy.get('[data-cy=kbs-logo]').should('be.visible').and('have.attr', 'src').and('include', 'kbs-ulm.jpg');
    cy.get('[data-cy=bawue-logo]').should('be.visible').and('have.attr', 'src').and('include', 'bawue.png');
    cy.get('[data-cy=bawue-digital-logo]').should('be.visible').and('have.attr', 'src').and('include', 'bawue-digital.png');
  })

  it('shows six highlights', () => {
    cy.get('#features').should('be.visible');
    cy.get('[data-cy=highlight-title] small' ).should('have.text', 'Highlights')
    cy.get('[data-cy=highlight-title] h3' ).should('have.text', 'Features you love')
    cy.get('[data-cy=highlights-row]').children().should('have.length', 6);
  });

  it('displays the discover app section', () => {
    cy.get('[data-cy=discover-app-row] h2').should('have.text', 'Discover our App');
    cy.get('[data-cy=discover-app-row] p').invoke('text').should('include', 'Lorem ipsum');
    cy.url().should('not.include', '#');
    cy.get('[data-cy=discover-app-row] a').invoke('text').should('equal','Read more');
    cy.get('[data-cy=discover-app-row] a').click();
    cy.url().should('include', '#');
    cy.get('[data-cy=discover-app-image] img').should('have.attr', 'src').and('include', 'perspective.png');

  });

  it('shows the features of the application', () => {
    cy.get('[data-cy=features-title] small').should('have.text', 'Features');
    cy.get('[data-cy=features-nav]').children().should('have.length', 4);
    // clicking all of the feature tabs
    cy.get('[data-cy=features-nav] > :nth-child(1) > .nav-link').click();
    cy.get('#feature-a > .row > .col-sm-9 > h2').should('have.text', 'Instruments');
    cy.get('[data-cy=features-nav] > :nth-child(2) > .nav-link').click();
    cy.get('#feature-b > .row > .col-sm-9 > h2').should('have.text', 'blabla b');
    cy.get('[data-cy=features-nav] > :nth-child(3) > .nav-link').click();
    cy.get('#feature-c > .row > .col-sm-9 > h2').should('have.text', 'blabla c');
    cy.get('[data-cy=features-nav] > :nth-child(4) > .nav-link').click();
    cy.get('#feature-d > .row > .col-sm-9 > h2').should('have.text', 'blabla d');

  });

  //test Create account etc.

  it.only('shows the gallery', () => {
    cy.get('#gallery').should('be.visible');
    cy.get('[data-cy=gallery-title] small').should('have.text', 'Gallery');
  })

  //TODO-Continue

})