import {
  LargeMobileDevice,
  SmallMobileDevice,
} from '@feelback-app/util/testing';

const largeDevice = new LargeMobileDevice();
const smallDevice = new SmallMobileDevice();
const deviceList = [largeDevice, smallDevice];
const orientationList = ['Portrait', 'Landscape'];

for (const device of deviceList) {
  for (const orientation of orientationList) {
    describe(
      '[Mobile Device (' +
        device.width +
        'x' +
        device.height +
        ') - ' +
        orientation +
        '] Testing the logo component of the FeelBack-web application.',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
        });

        it('should display the logo component at the start page', () => {
          cy.visit('/');
          cy.get('[data-cy=logos-container]').should('be.visible');
          cy.get('[data-cy=logos-container]')
            .children()
            .should('have.length', 5);
          cy.get('[data-cy=logos-container]')
            .children()
            .first()
            .should('have.class', 'client-logo img-fluid');
          cy.get('[data-cy=logos-container]')
            .children()
            .next()
            .should('have.class', 'client-logo img-fluid');
        });

        it('should display the logo component at the legal notice page', () => {
          cy.visit('/imprint');
          cy.get('[data-cy=logos-container]').should('be.visible');
          cy.get('[data-cy=logos-container]')
            .children()
            .should('have.length', 5);
          cy.get('[data-cy=logos-container]')
            .children()
            .first()
            .should('have.class', 'client-logo img-fluid');
          cy.get('[data-cy=logos-container]')
            .children()
            .next()
            .should('have.class', 'client-logo img-fluid');
        });

        it('should display the logo component at the privacy page', () => {
          cy.visit('/privacy');
          cy.get('[data-cy=logos-container]').should('be.visible');
          cy.get('[data-cy=logos-container]')
            .children()
            .should('have.length', 5);
          cy.get('[data-cy=logos-container]')
            .children()
            .first()
            .should('have.class', 'client-logo img-fluid');
          cy.get('[data-cy=logos-container]')
            .children()
            .next()
            .should('have.class', 'client-logo img-fluid');
        });
      },
    );
  }
}
