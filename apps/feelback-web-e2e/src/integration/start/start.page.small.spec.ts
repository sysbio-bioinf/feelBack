describe('(Small Screen) Testing the startpage of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
    cy.visit('/');
  });
});
