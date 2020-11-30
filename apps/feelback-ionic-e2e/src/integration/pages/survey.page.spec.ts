import {
  BrowserLanguageEN,
  LargeMobileDevice,
} from '@feelback-app/util/testing';

describe('Survey view component', () => {
  let testingDevice: LargeMobileDevice;

  before(() => {
    testingDevice = new LargeMobileDevice();
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);

    cy.visitMobile('/', BrowserLanguageEN);
    cy.get('[data-cy=button-login-anonymous]').click();
    cy.wait(300);
    cy.get('[data-cy=UI-Test-Dummy-Survey]').should('exist').and('be.visible');
    cy.get('[data-cy=start-button-UI-Test-Dummy-Survey]').click();
    cy.wait(200);
  });

  it('should display the test survey', () => {
    cy.get('[data-cy=header-title]')
      .invoke('text')
      .should('contain', 'UI-Test-Dummy-Survey');
    cy.get('.sv_page_title > span')
      .should('be.visible')
      .invoke('text')
      .and('contain', 'First-Page-Title');
    cy.get('.page-number-chip')
      .should('be.visible')
      .invoke('text')
      .should('contain', '1 / 3');
    cy.get('#instrument-navigation-submit').should('not.exist');
    cy.get('#instrument-navigation-back').should('not.exist');
    cy.get('#instrument-navigation-next').should('exist');
  });

  it('should display additional buttons in the header', () => {
    cy.get('#instrument-navigation-cancel').should('exist').and('be.visible');
    cy.get('[name="remove-circle-outline"]').should('exist').and('be.visible');
    cy.get('[name="add-circle-outline"]').should('exist').and('be.visible');
    // test changing font size
    cy.document().then((doc) => {
      const docElement = doc.getElementsByClassName(
        'sv_main',
      )[0] as HTMLElement;
      expect(docElement.style.fontSize).to.equal('');
    });
    cy.get('[name="add-circle-outline"]').click();
    cy.document().then((doc) => {
      const docElement = doc.getElementsByClassName(
        'sv_main',
      )[0] as HTMLElement;
      expect(docElement.style.fontSize).to.equal('1.1em');
    });
    for (let i = 0; i < 6; i++) {
      cy.get('[name="add-circle-outline"]').click();
    }
    cy.document().then((doc) => {
      const docElement = doc.getElementsByClassName(
        'sv_main',
      )[0] as HTMLElement;
      expect(docElement.style.fontSize).to.equal('1.5em');
    });
    for (let i = 0; i < 12; i++) {
      cy.get('[name="remove-circle-outline"]').click();
    }
    cy.document().then((doc) => {
      const docElement = doc.getElementsByClassName(
        'sv_main',
      )[0] as HTMLElement;
      expect(docElement.style.fontSize).to.equal('0.5em');
    });
    // test cancel button
    cy.get('#instrument-navigation-cancel').click();
    cy.get('.alert-head')
      .should('exist')
      .and('be.visible')
      .invoke('text')
      .should('contain', 'Cancel');
    cy.get('.success').should('be.visible');
    cy.get('.danger').should('be.visible');
    cy.get('.success').click();
    cy.get('.alert-head').should('not.exist');
    cy.get('#instrument-navigation-cancel').click();
    cy.get('.alert-head').should('exist');
    cy.get('.danger').click();
    cy.wait(300);
    cy.url().should('include', '/home');
    cy.get('[data-cy=header-title]')
      .invoke('text')
      .should('contain', 'FeelBack');
  });

  it('should be able to do the test survey', () => {
    // page 1
    cy.get('#instrument-navigation-submit').should('not.exist');
    cy.get('#instrument-navigation-back').should('not.exist');
    cy.get('#sq_106_errors').should('not.be.visible');
    cy.get('#instrument-navigation-next').click();
    cy.get('#sq_106_errors').should('be.visible');
    cy.get('#sq_106i_0').click({ force: true });
    cy.get('.sv-boolean__switch').click({ force: true });
    cy.get('#sq_108i_Row\\ 1_2').click({ force: true });
    cy.get('#sq_108i_Row\\ 2_1').click({ force: true });
    cy.get('#instrument-navigation-next').click();
    // page 2
    cy.get('.page-number-chip')
      .should('be.visible')
      .invoke('text')
      .should('contain', '2 / 3');
    cy.get('#instrument-navigation-back').should('exist').and('be.visible');
    cy.get('#sq_109_errors').should('not.be.visible');
    cy.get('#instrument-navigation-next').click();
    cy.get('#sq_109_errors').should('be.visible');
    cy.get('.sv-boolean__switch').click({ force: true });
    cy.get('#instrument-navigation-next').click();
    // page 3
    cy.get('.page-number-chip')
      .should('be.visible')
      .invoke('text')
      .should('contain', '3 / 3');
    cy.get('#instrument-navigation-next').should('not.exist');
    cy.get('#instrument-navigation-back').should('exist').and('be.visible');
    cy.get('#instrument-navigation-submit').should('exist').and('be.visible');
    // trying to submit
    cy.get('#sq_110_errors').should('not.be.visible');
    cy.get('#instrument-navigation-submit').click();
    cy.get('#sq_110_errors').should('be.visible');
    cy.get('#sq_110i_1').click({ force: true });
    // navigate through pages
    cy.get('#instrument-navigation-back').click();
    // page 2
    cy.get('.page-number-chip')
      .should('be.visible')
      .invoke('text')
      .should('contain', '2 / 3');
    cy.get('#instrument-navigation-back').click();
    // page 1
    cy.get('.page-number-chip')
      .should('be.visible')
      .invoke('text')
      .should('contain', '1 / 3');
    cy.get('#instrument-navigation-next').click();
    // page 2
    cy.get('#instrument-navigation-next').click();
    // page 3
    // finally submitting (no data is send to the server for this test survey)
    cy.get('#instrument-navigation-submit').click();
    cy.get('#instrument-navigation-cancel').should('not.exist');
    cy.get('[name="remove-circle-outline"]').should('not.exist');
    cy.get('[name="add-circle-outline"]').should('not.exist');
    cy.get('#printButton > .md').should('be.visible');
    cy.get('#navigateHome > .md').should('be.visible');
    cy.get('#navigateHome > .md').click();
    cy.url().should('contain', '/home');
  });
});
