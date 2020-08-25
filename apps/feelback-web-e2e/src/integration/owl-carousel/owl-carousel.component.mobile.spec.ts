import {
  LargeMobileDevice,
  SmallMobileDevice,
} from '@feelback-app/util/testing';

const largeDevice = new LargeMobileDevice();
const smallDevice = new SmallMobileDevice();
const deviceList = [largeDevice, smallDevice];
const orientationList = ['Portrait', 'Landscape'];

const browserVersion = Cypress.browser.majorVersion;
const browserFamily = Cypress.browser.family;

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
            '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-prev',
          ).should('have.class', 'disabled');
          cy.get(
            '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-next',
          ).should('not.have.class', 'disabled');
          cy.get(
            '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-next',
          ).click({ force: true });
          cy.get('[data-cy=testimonial-1] > .blockquote')
            .invoke('text')
            .should('contain', 'Review 2:');
          cy.get(
            '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-prev',
          ).should('not.have.class', 'disabled');
          cy.get(
            '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-next',
          ).should('not.have.class', 'disabled');
          cy.get(
            '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-next',
          ).click({ force: true });
          cy.get(
            '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-prev',
          ).should('not.have.class', 'disabled');
          cy.get(
            '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-next',
          ).should('have.class', 'disabled');
          cy.get('[data-cy=testimonial-2] > .blockquote')
            .invoke('text')
            .should('contain', 'Review 3:');
          cy.get('[data-cy=testimonial-2]').should('not.be.visible');
          cy.get('[data-cy=testimonial-1]').should('not.be.visible');
          cy.get(
            '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-prev',
          ).click({ force: true });
          cy.get('[data-cy=testimonial-1] h5').should(
            'have.text',
            'Monika Musterfrau',
          );
        });

        it('should support swipe gestures within the testimonials section', () => {
          // FIXME The 'Cypress Mobile Commands' Plugin seems to not work correct within firefox. In Firefox "Touch" is not defined. Works in chromium browsers.
          if (browserFamily !== 'chromium') {
            cy.log('Swipe gesture tests require chromium browsers.');
          } else {
            if (browserFamily === 'chromium' && browserVersion < 83) {
              cy.log(
                'This was only tested with chromium browsers with major version > 83. If you encounter issues, please update your browser.',
              );
            }
            cy.get('[data-cy=testimonial-0] > .blockquote').should(
              'be.visible',
            );
            cy.get('[data-cy=testimonial-1] > .blockquote').should(
              'not.be.visible',
            );
            cy.get('[data-cy=testimonial-2] > .blockquote').should(
              'not.be.visible',
            );
            cy.get(
              '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('right', 'left');
            cy.get('[data-cy=testimonial-0] > .blockquote').should(
              'not.be.visible',
            );
            cy.get('[data-cy=testimonial-1] > .blockquote').should(
              'be.visible',
            );
            cy.get('[data-cy=testimonial-2] > .blockquote').should(
              'not.be.visible',
            );
            cy.get(
              '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('right', 'left');
            cy.get('[data-cy=testimonial-0] > .blockquote').should(
              'not.be.visible',
            );
            cy.get('[data-cy=testimonial-1] > .blockquote').should(
              'not.be.visible',
            );
            cy.get('[data-cy=testimonial-2] > .blockquote').should(
              'be.visible',
            );
            cy.get(
              '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('left', 'right');
            cy.get(
              '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('left', 'right');
            cy.get('[data-cy=testimonial-0] > .blockquote').should(
              'be.visible',
            );
            cy.get('[data-cy=testimonial-1] > .blockquote').should(
              'not.be.visible',
            );
            cy.get('[data-cy=testimonial-2] > .blockquote').should(
              'not.be.visible',
            );
          }
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

        it('should support swipe gestures within the gallery section', () => {
          // FIXME The 'Cypress Mobile Commands' Plugin seems to not work correct within firefox. In Firefox "Touch" is not defined. Works in chromium browsers.
          if (browserFamily !== 'chromium') {
            cy.log('Swipe gesture tests require chromium browsers.');
          } else {
            if (browserFamily === 'chromium' && browserVersion < 83) {
              cy.log(
                'This was only tested with chromium browsers with major version > 83. If you encounter issues, please update your browser.',
              );
            }
            cy.wait(300);
            cy.get('.owl-dots > :nth-child(1)').click({ force: true });
            cy.get('[data-cy=gallery-img-0]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
            cy.get(
              '[data-cy=owl-carousel-gallery] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('center', 'left');
            cy.get('[data-cy=gallery-img-1]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
            cy.get(
              '[data-cy=owl-carousel-gallery] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('center', 'left');
            cy.get('[data-cy=gallery-img-2]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
            cy.get(
              '[data-cy=owl-carousel-gallery] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('right', 'center');
            cy.get('[data-cy=gallery-img-3]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
            cy.get(
              '[data-cy=owl-carousel-gallery] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('right', 'center');
            // gallery should loop
            cy.get('[data-cy=gallery-img-0]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
            // swipe back
            cy.get(
              '[data-cy=owl-carousel-gallery] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('left', 'center');
            cy.get('[data-cy=gallery-img-3]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
            cy.get(
              '[data-cy=owl-carousel-gallery] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('left', 'center');
            cy.get('[data-cy=gallery-img-2]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
            cy.get(
              '[data-cy=owl-carousel-gallery] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('left', 'center');
            cy.get('[data-cy=gallery-img-1]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
            cy.get(
              '[data-cy=owl-carousel-gallery] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('center', 'right');
            cy.get('[data-cy=gallery-img-0]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
            cy.get(
              '[data-cy=owl-carousel-gallery] > .owl-carousel > .owl-stage-outer > owl-stage',
            ).swipe('center', 'right');
            cy.get('[data-cy=gallery-img-3]')
              .parent('.center')
              .should('have.class', 'active')
              .and('have.class', 'center');
          }
        });
      },
    );
  }
}
