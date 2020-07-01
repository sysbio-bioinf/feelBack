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
        '] Testing the Legal Notice Page of the FeelBack-web application.',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
          cy.visit('/imprint');
        });

        it('should show the imprint section', () => {
          cy.get('[data-cy=imprint-section]').should('be.visible');
          cy.get('[data-cy=imprint-title]')
            .invoke('text')
            .should('include', 'Legal Notice');
        });

        it('should display the correct data', () => {
          cy.get('[data-cy=imprint-publisher-headline]')
            .invoke('text')
            .should('include', 'Publisher');
          cy.get('[data-cy=imprint-organization]')
            .invoke('text')
            .should('include', 'Ulm University');
          cy.get('[data-cy=imprint-institute]')
            .invoke('text')
            .should('include', 'Medical Systems Biology');
          cy.get('[data-cy=imprint-address1]')
            .invoke('text')
            .should('include', 'Albert-Einstein-Allee 11');
          cy.get('[data-cy=imprint-address2]')
            .invoke('text')
            .should('include', '89081 Ulm, Germany');
          cy.get('[data-cy=imprint-phone]')
            .invoke('text')
            .should('include', '50 24500');
          cy.get('[data-cy=imprint-fax]')
            .invoke('text')
            .should('include', '50 24502');
          cy.get('[data-cy=imprint-mail]')
            .invoke('text')
            .should('include', 'hans.kestler@uni-ulm.de');
        });

        it('should display the markdown section', () => {
          cy.get('[data-cy=imprint-markdown-section]').should('be.visible');
          cy.get('[data-cy=imprint-markdown-template]').should('be.visible');
          cy.get('[data-cy=imprint-markdown-template]')
            .children()
            .should('have.length.gte', 1);
        });

        it('should change language', () => {
          cy.get('[data-cy=imprint-title]')
            .invoke('text')
            .should('include', 'Legal Notice');
          cy.get('[data-cy=imprint-publisher-headline]')
            .invoke('text')
            .should('include', 'Publisher');
          cy.get('[data-cy=header-navbar-toggler]').click();
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#deDropdownSelect').click();
          cy.get('[data-cy=imprint-title]')
            .invoke('text')
            .should('include', 'Impressum');
          cy.get('[data-cy=imprint-publisher-headline]')
            .invoke('text')
            .should('include', 'Herausgeber');
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#enDropdownSelect').click();
          cy.get('[data-cy=imprint-title]')
            .invoke('text')
            .should('include', 'Legal Notice');
          cy.get('[data-cy=imprint-publisher-headline]')
            .invoke('text')
            .should('include', 'Publisher');
        });
      },
    );
  }
}
