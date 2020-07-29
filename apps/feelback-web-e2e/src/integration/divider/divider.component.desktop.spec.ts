import { DesktopDevice } from '@feelback-app/util/testing';

const device = new DesktopDevice();

describe('Testing the divider component of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.viewport(device.width, device.height);
  });

  it('should display the divider component at the legal notice page', () => {
    cy.visit('/imprint');
    cy.get('[data-cy=colored-divider]').should('be.visible');
  });

  it('should display the divider component at the privacy page', () => {
    cy.visit('/privacy');
    cy.get('[data-cy=colored-divider]').should('be.visible');
  });
});
