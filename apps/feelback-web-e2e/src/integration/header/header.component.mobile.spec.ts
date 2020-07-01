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
        '] Testing the header component of the FeelBack-web application.',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
          cy.visit('/');
        });

        it('should display the header bar', () => {
          cy.get('[data-cy=header-title]').then(($text) => {
            expect($text).to.contain('FeelBack');
          });
          cy.get('[data-cy=header-title]').should('be.visible');
          cy.get('[data-cy=header-nav-menu]').should('be.visible');
          cy.get('[data-cy=header-navbar]').should('be.visible');
          cy.get('[data-cy=header-navbar-nav]').should('not.be.visible');
          cy.get('[data-cy=header-navbar-nav]')
            .children()
            .should('have.length', 7);
          cy.get('[data-cy=header-navbar-toggler]').should('be.visible');
        });

        it('should contain two languages', () => {
          cy.get('[data-cy=header-navbar-dropdown-menu]').should(
            'not.be.visible',
          );
          cy.get('#deDropdownSelect').should('not.be.visible');
          cy.get('#enDropdownSelect').should('not.be.visible');
          cy.get('[data-cy=header-navbar-language-button]').should(
            'not.be.visible',
          );
          cy.get('[data-cy=header-navbar-dropdown-menu]')
            .children()
            .should('have.length', 2);
          cy.get('[data-cy=header-navbar-toggler]').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-language-button]').should(
            'be.visible',
          );
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#enDropdownSelect').contains('English').and('be.visible');
          cy.get('#deDropdownSelect').contains('Deutsch').and('be.visible');
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#deDropdownSelect').should('not.be.visible');
        });

        it('should change language', () => {
          cy.get('[data-cy=header-navbar-toggler]').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-nav] li a')
            .eq(1)
            .should('have.attr', 'href')
            .and('include', 'features');
          cy.get('[data-cy=header-navbar-nav] li a')
            .eq(5)
            .should('have.attr', 'href')
            .and('include', 'contact');
          cy.get('[data-cy=header-navbar-nav] li a')
            .eq(1)
            .should('have.text', 'Features');
          cy.get('[data-cy=header-navbar-nav] li a')
            .eq(5)
            .should('have.text', 'Contact');
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#deDropdownSelect').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-nav] li a')
            .eq(1)
            .should('have.text', 'Funktionen');
          cy.get('[data-cy=header-navbar-nav] li a')
            .eq(5)
            .should('have.text', 'Kontakt');
          cy.get('[data-cy=header-navbar-language-button]').click();
          cy.get('#enDropdownSelect').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-nav] li a')
            .eq(5)
            .should('have.text', 'Contact');
          cy.get('[data-cy=header-navbar-nav] li a')
            .eq(1)
            .should('have.text', 'Features');
        });

        it('should activate the nav-items', () => {
          cy.get('[data-cy=header-navbar-toggler]').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-nav]')
            .find('.active')
            .should('have.length', 1);
          cy.get('[data-cy=header-navbar-home] a').should(
            'have.class',
            'active',
          );
          cy.get('[data-cy=header-navbar-features] a').should(
            'not.have.class',
            'active',
          );
          cy.get('[data-cy=header-navbar-features] a').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-toggler]').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-home] a').should(
            'not.have.class',
            'active',
          );
          cy.get('[data-cy=header-navbar-features] a').should(
            'have.class',
            'active',
          );
          cy.get('[data-cy=header-navbar-gallery] a').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-toggler]').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-features] a').should(
            'not.have.class',
            'active',
          );
          cy.get('[data-cy=header-navbar-gallery] a').should(
            'have.class',
            'active',
          );
          cy.get('[data-cy=header-navbar-download] a').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-toggler]').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-gallery] a').should(
            'not.have.class',
            'active',
          );
          cy.get('[data-cy=header-navbar-download] a').should(
            'have.class',
            'active',
          );
          cy.get('[data-cy=header-navbar-contact] a').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-toggler]').click();
          cy.wait(300);
          cy.get('[data-cy=header-navbar-download] a').should(
            'not.have.class',
            'active',
          );
          cy.get('[data-cy=header-navbar-contact] a').should(
            'have.class',
            'active',
          );
        });

        it('should navigate back to start page from all other pages', () => {
          cy.get('[data-cy=FeelBack-title]').should('exist');
          cy.visit('/privacy');
          cy.get('[data-cy=FeelBack-title]').should('not.exist');
          cy.get('[data-cy=header-title]').click();
          cy.get('[data-cy=FeelBack-title]')
            .should('have.text', 'FeelBack')
            .and('be.visible');
          cy.visit('/imprint');
          cy.get('[data-cy=FeelBack-title]').should('not.exist');
          cy.get('[data-cy=header-title]').click();
          cy.get('[data-cy=FeelBack-title]')
            .should('have.text', 'FeelBack')
            .and('be.visible');
        });
      },
    );
  }
}
