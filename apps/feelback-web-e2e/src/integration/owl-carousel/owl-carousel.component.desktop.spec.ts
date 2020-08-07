import { DesktopDevice } from '@feelback-app/util/testing';

const device = new DesktopDevice();

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

  // it.only('should support swiping', () => {
  //   cy.visitMobile('/');
  //   cy.wait(500);
  //   cy.get('[data-cy=testimonial-0]').swipe('right', 'left');
  //   cy.get(
  //     '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-prev ',
  //   ).should('have.class', 'disabled');
  //   cy.get(
  //     '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-next',
  //   ).should('not.have.class', 'disabled');
  //   //cy.get('[data-cy=testimonial-0]').swipe('right', 'left');
  //   cy.get('[data-cy=testimonial-0] > .client-img').swipe('right', 'left');
  //   cy.wait(500);
  //   cy.get(
  //     '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-prev ',
  //   ).should('not.have.class', 'disabled');
  //   cy.get(
  //     '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel > .owl-nav > .owl-next',
  //   ).should('not.have.class', 'disabled');
  // });
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

  // in progress
  it.only('swipe workaround', () => {
    cy.wait(2000);
    cy.get(
      '[data-cy=testimonials-section] > .container > feelback-web-carousel > [data-cy=owl-carousel] > .owl-carousel',
    )
      .trigger('mousedown', 'center')
      .trigger('mouseleave')
      .trigger('mousemove', 'left')
      .trigger('mouseup', 'left');
  });
});
