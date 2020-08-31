import { DesktopDevice } from '@feelback-app/util/testing';

const device = new DesktopDevice();

const browserVersion = Cypress.browser.majorVersion;
const browserFamily = Cypress.browser.family;

describe('Testing the testimonials owl-carousel on the startpage of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.viewport(device.width, device.height);
    cy.visit('/');
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

  it('should navigate through the testimonials and test the content', () => {
    cy.wait(200);
    cy.get('[data-cy=testimonial-0] > .blockquote')
      .invoke('text')
      .should('have.length.greaterThan', 0);
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
      .should('have.length.greaterThan', 0);
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
      .should('have.length.greaterThan', 0);
    cy.get('[data-cy=testimonial-2]').should('not.be.visible');
    cy.get('[data-cy=testimonial-1]').should('not.be.visible');
    cy.get(
      '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-nav > .owl-prev',
    ).click({ force: true });
    cy.get('[data-cy=testimonial-1] h5')
      .invoke('text')
      .should('have.length.greaterThan', 0);
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
      cy.get('[data-cy=testimonial-0] > .blockquote').should('be.visible');
      cy.get('[data-cy=testimonial-1] > .blockquote').should('not.be.visible');
      cy.get('[data-cy=testimonial-2] > .blockquote').should('not.be.visible');
      cy.get(
        '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-stage-outer > owl-stage',
      ).swipe('right', 'left');
      cy.get('[data-cy=testimonial-0] > .blockquote').should('not.be.visible');
      cy.get('[data-cy=testimonial-1] > .blockquote').should('be.visible');
      cy.get('[data-cy=testimonial-2] > .blockquote').should('not.be.visible');
      cy.get(
        '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-stage-outer > owl-stage',
      ).swipe('right', 'left');
      cy.get('[data-cy=testimonial-0] > .blockquote').should('not.be.visible');
      cy.get('[data-cy=testimonial-1] > .blockquote').should('not.be.visible');
      cy.get('[data-cy=testimonial-2] > .blockquote').should('be.visible');
      cy.get(
        '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-stage-outer > owl-stage',
      ).swipe('left', 'right');
      cy.get(
        '[data-cy=owl-carousel-testimonial] > .owl-carousel > .owl-stage-outer > owl-stage',
      ).swipe('left', 'right');
      cy.get('[data-cy=testimonial-0] > .blockquote').should('be.visible');
      cy.get('[data-cy=testimonial-1] > .blockquote').should('not.be.visible');
      cy.get('[data-cy=testimonial-2] > .blockquote').should('not.be.visible');
    }
  });
});

describe('Testing the gallery owl-carousel on the startpage of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.viewport(device.width, device.height);
    cy.visit('/');
  });

  it('shows the gallery', () => {
    cy.get('#gallery').should('be.visible');
    cy.get('[data-cy=gallery-title] small').should('have.text', 'Gallery');
    cy.get('[data-cy=gallery-title] h3').should(
      'have.text',
      'FeelBack App Screenshots',
    );
  });

  it('should display the images', () => {
    cy.get('[data-cy=gallery-img-0]')
      .should('have.attr', 'src')
      .and('include', 'assets/images/screens/');
    cy.wait(3000);
    cy.get('[data-cy=gallery-img-1]')
      .should('have.attr', 'src')
      .should('include', 'assets/images/screens/');
    cy.get('[data-cy=gallery-img-2]').should('not.exist');
    cy.wait(3000);
    cy.get('[data-cy=gallery-img-2]')
      .should('have.attr', 'src')
      .should('include', 'assets/images/screens/');
    cy.get('[data-cy=gallery-img-3]')
      .should('have.attr', 'src')
      .should('include', 'assets/images/screens/');
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
});
