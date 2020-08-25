import {
  DesktopDevice,
  LargeMobileDevice,
  SmallMobileDevice,
} from '@feelback-app/util/testing';

const desktopDevice = new DesktopDevice();
const largeDevice = new LargeMobileDevice();
const smallDevice = new SmallMobileDevice();
const deviceList = [desktopDevice, largeDevice, smallDevice];
const orientationList = ['Portrait', 'Landscape'];
const handheldTreshold = 991;

for (const device of deviceList) {
  for (const orientation of orientationList) {
    describe(
      '[Device (' +
        device.width +
        'x' +
        device.height +
        ') - ' +
        orientation +
        '] Testing the interpolations for the translations of the Startpage',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
          cy.visit('/');
        });

        it('should not display any unresolved texts', () => {
          cy.contains(/app\.\w+\./).should('not.exist');
          if (
            (device.width <= handheldTreshold && orientation === 'Portrait') ||
            (device.height <= handheldTreshold && orientation === 'Landscape')
          ) {
            cy.get('[data-cy=header-navbar-toggler]').click();
          }
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#deDropdownSelect').click();
          cy.contains(/app\.\w+\./).should('not.exist');
        });
      },
    );

    describe(
      '[Device (' +
        device.width +
        'x' +
        device.height +
        ') - ' +
        orientation +
        '] Testing the interpolations for the translations of the Imprint Page',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
          cy.visit('/imprint');
        });

        it('should not display any unresolved texts', () => {
          cy.contains(/app\.\w+\./).should('not.exist');
          if (
            (device.width <= handheldTreshold && orientation === 'Portrait') ||
            (device.height <= handheldTreshold && orientation === 'Landscape')
          ) {
            cy.get('[data-cy=header-navbar-toggler]').click();
          }
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#deDropdownSelect').click();
          cy.contains(/app\.\w+\./).should('not.exist');
        });
      },
    );

    describe(
      '[Device (' +
        device.width +
        'x' +
        device.height +
        ') - ' +
        orientation +
        '] Testing the interpolations for the translations of the Privacy Page',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
          cy.visit('/privacy');
        });

        it('should not display any unresolved texts', () => {
          cy.contains(/app\.\w+\./).should('not.exist');
          if (
            (device.width <= handheldTreshold && orientation === 'Portrait') ||
            (device.height <= handheldTreshold && orientation === 'Landscape')
          ) {
            cy.get('[data-cy=header-navbar-toggler]').click();
          }
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#deDropdownSelect').click();
          cy.contains(/app\.\w+\./).should('not.exist');
        });
      },
    );
  }
}
