describe('(Small Screen) Testing the footer component of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/');
    cy.scrollTo('bottom');
  });
});
