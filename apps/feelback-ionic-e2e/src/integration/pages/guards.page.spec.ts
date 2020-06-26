import { LargeMobileDevice } from '@cancerlog/util/testing';

describe('Guards', () => {
  let testingDevice: LargeMobileDevice;

  before(() => {
    testingDevice = new LargeMobileDevice();
  });

  beforeEach(() => {
    cy.viewport(testingDevice.width, testingDevice.height);
  });

  it('should be able to directly call unprotected pages', () => {
    const unprotectedUrls = ['/', '/start', '/tutorial', '/auth/login'];

    for (const currentUrl of unprotectedUrls) {
      cy.visitMobile(currentUrl);
      cy.wait(300);

      cy.url().should('contain', currentUrl);
    }
  });

  it('should not be able to directly call locked pages', () => {
    const lockedUrls = [
      '/main',
      '/main/home',
      '/main/settings',
      '/main/imprint',
      '/main/my',
      '/main/my/profile',
      '/main/organizations',
      '/main/organizations/1',
      '/main/surveys',
      '/main/surveys/1',
      '/main/faqs',
      '/main/faqs/1',
    ];

    for (const currentUrl of lockedUrls) {
      cy.visitMobile(currentUrl);
      cy.wait(300);

      cy.url().should('not.contain', currentUrl);
      cy.url().should('contain', '/start');
    }
  });

  // FIXME: redirect unknown urls to /start
  it('should redirect unknown urls', () => {
    const lockedUrls = ['/unknown/url'];

    for (const currentUrl of lockedUrls) {
      cy.visitMobile(currentUrl);
      cy.wait(300);

      cy.url().should('not.contain', currentUrl);
      cy.url().should('contain', '/start');
    }
  });
});
