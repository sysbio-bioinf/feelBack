import { LargeMobileDevice } from '@cancerlog/util/testing';
import { watchFile } from 'fs';

describe('Tutorial Page', () => {
  let testingDevice: LargeMobileDevice;

  before(() => {
    testingDevice = new LargeMobileDevice();
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);

    cy.visitMobile('/');
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
    cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
    cy.wait(300);
    cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
    cy.wait(300);
    cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
    cy.wait(300);
  });

  it('should display the BACK button correctly', () => {
    // slide 1
    cy.get('[data-cy=button-tutorial-back').should('be.visible');
    cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
    cy.wait(300);

    // slide 2
    cy.get('[data-cy=button-tutorial-back').should('be.visible');
    cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
    cy.wait(300);

    // slide 3
    cy.get('[data-cy=button-tutorial-back').should('be.visible');
    cy.get('[data-cy=tutorial-slide-container]').swipe('right', 'left');
    cy.wait(300);

    // slide 4
    cy.get('[data-cy=button-tutorial-back').should('not.be.visible');
  });
});
