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
        '] Testing the owl-carousel component of the FeelBack-web application.',
      () => {
        beforeEach(() => {
          if (orientation === 'Portrait') {
            cy.viewport(device.width, device.height);
          } else {
            cy.viewport(device.height, device.width);
          }
          cy.visitMobile('/');
        });

        it('shows the testimonials', () => {
          cy.get('[data-cy=testimonials-section]').should('be.visible');
          cy.get('[data-cy=testimonials-title] small').should(
            'have.text',
            'TESTIMONIALS',
          );
          cy.get('[data-cy=testimonials-title] h3').should(
            'have.text',
            'What our Customers say',
          );
        });

        it('should show the correct testimonials and navigate through them', () => {
          cy.wait(200);
          cy.get('[data-cy=testimonial-0] > .blockquote')
            .invoke('text')
            .should('contain', 'Review 1:');
          cy.get(
            '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-prev ',
          ).should('have.class', 'disabled');
          cy.get(
            '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-next',
          ).should('not.have.class', 'disabled');
          cy.get(
            '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-next > .fas',
          ).click({ force: true });
          cy.get('[data-cy=testimonial-1] > .blockquote')
            .invoke('text')
            .should('contain', 'Review 2:');
          cy.get(
            '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-prev ',
          ).should('not.have.class', 'disabled');
          cy.get(
            '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-next',
          ).should('not.have.class', 'disabled');
          cy.get(
            '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-next > .fas',
          ).click({ force: true });
          cy.get(
            '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-prev ',
          ).should('not.have.class', 'disabled');
          cy.get(
            '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-next',
          ).should('have.class', 'disabled');
          cy.get('[data-cy=testimonial-2] > .blockquote')
            .invoke('text')
            .should('contain', 'Review 3:');
          cy.get('[data-cy=testimonial-2]').should('not.be.visible');
          cy.get('[data-cy=testimonial-1]').should('not.be.visible');
          cy.get(
            '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-prev',
          ).click({ force: true });
          cy.get('[data-cy=testimonial-1] h5').should(
            'have.text',
            'Monika Musterfrau',
          );
        });

        it('shows the gallery', () => {
          cy.get('#gallery').should('be.visible');
          cy.get('[data-cy=gallery-title] small').should(
            'have.text',
            'Gallery',
          );
          cy.get('[data-cy=gallery-title] h3').should(
            'have.text',
            'FeelBack App Screenshots',
          );
        });

        it('should display the correct images', () => {
          cy.get('[data-cy=gallery-img-0]')
            .should('have.attr', 'src')
            .should('include', 'screen-01.png');
          cy.wait(3000);
          cy.get('[data-cy=gallery-img-1]')
            .should('have.attr', 'src')
            .should('include', 'screen-02.png');
          cy.get('[data-cy=gallery-img-2]').should('not.exist');
          cy.wait(3000);
          cy.get('[data-cy=gallery-img-2]')
            .should('have.attr', 'src')
            .should('include', 'screen-03.png');
          cy.get('[data-cy=gallery-img-3]')
            .should('have.attr', 'src')
            .should('include', 'screen-04.png');
        });
      },
    );
  }
}
