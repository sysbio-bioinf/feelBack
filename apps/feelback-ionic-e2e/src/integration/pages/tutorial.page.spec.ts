import {
  BrowserLanguageEN,
  LargeMobileDevice,
  BrowserLanguageDE,
} from '@feelback-app/util/testing';

describe('Tutorial Page', () => {
  let testingDevice: LargeMobileDevice;

  before(() => {
    testingDevice = new LargeMobileDevice();
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);

    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-tutorial]').click();
    cy.wait(300);
  });

  it('should open the tutorial page', () => {
    cy.url().should('contain', '/tutorial');
  });

  it('should have minimum 1 slide', () => {
    cy.get('[data-cy=tutorial-slide]').should('have.length.gte', 1);
    cy.get('.swiper-pagination-bullet').should('have.length.gte', 1);
  });

  it('should have a bullet for every slide', () => {
    const slideCount = Cypress.$('[data-cy=tutorial-slide]').length;

    cy.get('[data-cy=tutorial-slide]').should('have.length', slideCount);
    cy.get('.swiper-pagination-bullet').should('have.length', slideCount);
  });

  it('should allow sliding through pages', () => {
    const slideCount = Cypress.$('[data-cy=tutorial-slide]').length;

    for (let currentSlide = 0; currentSlide < slideCount - 1; currentSlide++) {
      cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
      cy.wait(300);
    }
  });

  it('should display the BACK button on every slide', () => {
    const slideCount = Cypress.$('[data-cy=tutorial-slide]').length;
    for (let currentSlide = 0; currentSlide < slideCount - 1; currentSlide++) {
      cy.get('[data-cy=header-back').should('be.visible');
      cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
      cy.wait(300);
    }
  });

  it('should return to login screen on BACK button click', () => {
    cy.get('[data-cy=header-back').click();
    cy.wait(300);

    cy.url().should('not.contain', '/tutorial');
    cy.url().should('contain', '/start');
  });

  it('should return to login screen on ACTION button click', () => {
    const slideCount = Cypress.$('[data-cy=tutorial-slide]').length;

    for (let currentSlide = 0; currentSlide < slideCount - 1; currentSlide++) {
      cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
      cy.wait(300);
    }

    cy.get('[data-cy=button-tutorial-action]').click();
    cy.wait(300);

    cy.url().should('not.contain', '/tutorial');
    cy.url().should('contain', '/start');
  });

  describe('Content DE', () => {
    beforeEach(() => {
      cy.viewport(testingDevice.width, testingDevice.height);

      cy.visitMobile('/', BrowserLanguageDE);
      cy.get('[data-cy=button-tutorial]').click();
      cy.wait(300);
    });

    it.only('should check some important labels', () => {
      const slideCount = Cypress.$('[data-cy=tutorial-slide]').length;

      for (
        let currentSlide = 0;
        currentSlide < slideCount - 1;
        currentSlide++
      ) {
        cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
        cy.wait(300);
      }
      cy.get('[data-cy=button-tutorial-action]')
        .invoke('text')
        .should('contain', 'FeelBack starten');
    });
  });
});
