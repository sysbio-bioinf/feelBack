describe('feelback-ionic', () => {
  beforeEach(() => {});

  it('should show the login page', () => {
    cy.visit('/');
    cy.title().should('eq', 'FeelBack');
  });
});
