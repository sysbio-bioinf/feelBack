import { LargeMobileDevice, SmallMobileDevice } from '@cancerlog/util/testing';

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
        '] Testing the Privacy Policy Page of the FeelBack-web application.',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
          cy.visit('/privacy');
        });

        it('should show the privacy section', () => {
          cy.get('[data-cy=privacy-section]').should('be.visible');
          cy.get('[data-cy=privacy-title]')
            .invoke('text')
            .should('include', 'Privacy Policy');
        });

        it('should display the correct data', () => {
          cy.get('[data-cy=privacy-tagline]')
            .invoke('text')
            .should('include', 'When you use our services');
          cy.get('[data-cy=privacy-note]')
            .invoke('text')
            .should('include', 'This Privacy Policy is meant to help');
          cy.get('[data-cy=privacy-date]')
            .invoke('text')
            .then((text) => {
              expect(text).to.match(/Effective.*?20\d{2}/);
            });
        });

        it('should display the markdown section', () => {
          cy.get('[data-cy=privacy-markdown-section]').should('be.visible');
          cy.get('[data-cy=privacy-markdown-template]').should('be.visible');
          cy.get('[data-cy=privacy-markdown-template]')
            .children()
            .should('have.length.gte', 1);
        });

        it('should change language', () => {
          cy.get('[data-cy=privacy-title]')
            .invoke('text')
            .should('include', 'Privacy Policy');
          cy.get('[data-cy=privacy-tagline]')
            .invoke('text')
            .should('include', 'When you use our services');
          cy.get('[data-cy=header-navbar-toggler]').click();
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#deDropdownSelect').click();
          cy.get('[data-cy=privacy-title]')
            .invoke('text')
            .should('include', 'Datenschutzerklärung');
          cy.get('[data-cy=privacy-tagline]')
            .invoke('text')
            .should('include', 'Wenn Sie unseren Dienst nutzen');
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#enDropdownSelect').click();
          cy.get('[data-cy=privacy-title]')
            .invoke('text')
            .should('include', 'Privacy Policy');
          cy.get('[data-cy=privacy-tagline]')
            .invoke('text')
            .should('include', 'When you use our services');
        });
      },
    );
  }
}
