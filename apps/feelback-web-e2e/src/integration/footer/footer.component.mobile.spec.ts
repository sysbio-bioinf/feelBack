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
        '] Testing the footer component of the FeelBack-web application.',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
          cy.visit('/');
        });

        it('should display the footer bar', () => {
          cy.get('[data-cy=footer-section]').should('be.visible');
          cy.get('[data-cy=footer-section]')
            .children()
            .should('have.length', 2);
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
            .should('have.attr', 'routerLink')
            .and('include', '');
          cy.get('[data-cy=footer-links] a').eq(1).should('have.text', 'Terms');
          cy.get('[data-cy=footer-links] a')
            .eq(1)
            .should('have.attr', 'routerLink')
            .and('include', '');
          cy.get('[data-cy=footer-links] a')
            .eq(2)
            .should('have.text', 'Privacy');
          cy.get('[data-cy=footer-links] a')
            .eq(2)
            .should('have.attr', 'routerLink')
            .and('include', 'privacy');
          cy.get('[data-cy=footer-links] a')
            .eq(3)
            .should('have.text', 'Legal Notice');
          cy.get('[data-cy=footer-links] a')
            .eq(3)
            .should('have.attr', 'routerLink')
            .and('include', 'imprint');
        });
      },
    );
  }
}
