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
        '] Testing the divider component of the FeelBack-web application.',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
        });

        it('should display the divider component at the legal notice page', () => {
          cy.visit('/imprint');
          cy.get('[data-cy=colored-divider]').should('be.visible');
        });

        it('should display the divider component at the privacy page', () => {
          cy.visit('/privacy');
          cy.get('[data-cy=colored-divider]').should('be.visible');
        });
      },
    );
  }
}
