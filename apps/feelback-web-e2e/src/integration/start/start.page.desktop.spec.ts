import { DesktopDevice } from '@feelback-app/util/testing';

const device = new DesktopDevice();

describe('Testing the startpage of the FeelBack-web application', () => {
  beforeEach(() => {
    cy.viewport(device.width, device.height);
    cy.visit('/');
  });

  it('should display the headline', () => {
    cy.get('[data-cy=FeelBack-title]')
      .should('have.text', 'FeelBack')
      .and('be.visible');
    cy.get('[data-cy=FeelBack-description]')
      .first()
      .invoke('text')
      .should('include', 'description about FeelBack');

    cy.get('[data-cy=title-image]')
      .should('have.attr', 'src')
      .and('include', 'iphonex.png');
  });

  it('show five logos', () => {
    cy.get('[data-cy=logos-container]').children().should('have.length', 5);
    cy.get('[data-cy=uniklinik-logo]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'uniklinik-ulm.png');
    cy.get('[data-cy=uni-logo]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'uni-ulm.svg');
    cy.get('[data-cy=kbs-logo]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'kbs-ulm.jpg');
    cy.get('[data-cy=bawue-logo]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'bawue.png');
    cy.get('[data-cy=bawue-digital-logo]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'bawue-digital.png');
  });

  it('shows six highlights', () => {
    cy.get('[data-cy=highlights-section]').should('be.visible');
    cy.get('[data-cy=highlights-title] small').should(
      'have.text',
      'Highlights',
    );
    cy.get('[data-cy=highlights-title] h3').should(
      'have.text',
      'Highlights you love',
    );
    cy.get('[data-cy=highlights-row]').children().should('have.length', 6);
  });

  it('displays the discover app section', () => {
    cy.get('[data-cy=discover-section]').should('be.visible');
    cy.get('[data-cy=discover-app-row] > .col-lg-6 > .box-icon')
      .children()
      .should('have.class', 'fas')
      .and('have.class', 'fa-mobile-alt');
    cy.get('[data-cy=discover-app-row] h2').should(
      'have.text',
      'Discover our App',
    );
    cy.get('[data-cy=discover-app-row] p')
      .invoke('text')
      .should('include', 'Lorem ipsum');
    cy.url().should('not.include', '#');
    cy.get('[data-cy=discover-app-row] a')
      .invoke('text')
      .should('equal', 'Read more');
    // click({force: true}) because the navbar is above the element (no problem when using the website manually)
    cy.get('[data-cy=discover-app-row] a').click({ force: true });
    cy.url().should('include', '#');
    cy.get('[data-cy=discover-app-image] img')
      .should('have.attr', 'src')
      .and('include', 'perspective.png');
  });

  it('shows the features of the application', () => {
    cy.get('[data-cy=features-section]').should('be.visible');
    cy.get('[data-cy=features-title] small').should('have.text', 'Features');
    cy.get('[data-cy=features-title] h3')
      .invoke('text')
      .should('include', 'Do more');
    cy.get('[data-cy=features-nav]').children().should('have.length', 4);
    // clicking all of the feature tabs
    // waiting time because the content is not shown instantly
    // click({force: true}) because the navbar is above the element (no problem when using the website manually)
    cy.get('[data-cy=feature-link-a]').click({ force: true });
    cy.wait(150);
    cy.get('[data-cy=feature-card-title-a] > h2')
      .should('have.text', 'Instruments')
      .and('be.visible');
    cy.get('[data-cy=feature-card-title-b] > h2').should('not.be.visible');
    cy.get('[data-cy=feature-card-title-c] > h2').should('not.be.visible');
    cy.get('[data-cy=feature-card-title-d] > h2').should('not.be.visible');

    cy.get('[data-cy=feature-link-b]').click({ force: true });
    cy.wait(150);
    cy.get('[data-cy=feature-card-title-b] > h2')
      .should('have.text', 'blabla b')
      .and('be.visible');
    cy.get('[data-cy=feature-card-title-a] > h2').should('not.be.visible');
    cy.get('[data-cy=feature-card-title-c] > h2').should('not.be.visible');
    cy.get('[data-cy=feature-card-title-d] > h2').should('not.be.visible');

    cy.get('[data-cy=feature-link-c]').click({ force: true });
    cy.wait(150);
    cy.get('[data-cy=feature-card-title-c] > h2')
      .should('have.text', 'blabla c')
      .and('be.visible');
    cy.get('[data-cy=feature-card-title-a] > h2').should('not.be.visible');
    cy.get('[data-cy=feature-card-title-b] > h2').should('not.be.visible');
    cy.get('[data-cy=feature-card-title-d] > h2').should('not.be.visible');

    cy.get('[data-cy=feature-link-d]').click({ force: true });
    cy.wait(150);
    cy.get('[data-cy=feature-card-title-d] > h2')
      .should('have.text', 'blabla d')
      .and('be.visible');
    cy.get('[data-cy=feature-card-title-a] > h2').should('not.be.visible');
    cy.get('[data-cy=feature-card-title-b] > h2').should('not.be.visible');
    cy.get('[data-cy=feature-card-title-c] > h2').should('not.be.visible');
  });

  it('shows how to get started', () => {
    cy.get('[data-cy=get-started-section]').should('be.visible');
    cy.get('[data-cy=get-started-steps]').children().should('have.length', 3);
    cy.get('[data-cy=get-started-create-account] h5').should(
      'have.text',
      'Create an Account',
    );
    cy.get('[data-cy=get-started-sharing] h5').should(
      'have.text',
      'Share with friends',
    );
    cy.get('[data-cy=get-started-enjoy] h5').should(
      'have.text',
      'Enjoy your life',
    );
  });

  it('should display FAQs', () => {
    // as long as there are no FAQs loaded:
    cy.get('[data-cy=faq-section]').should('not.exist');
    // cy.get('[data-cy=faq-section]').should('be.visible');
    // cy.get('[data-cy=faq-title] small').should('have.text', 'FAQs');
    // cy.get('[data-cy=faq-title] h3').should(
    //   'have.text',
    //   'Frequently Asked Questions',
    // );
    cy.log('This needs to get tested after there is a seeded dummy backend');
  });

  it('shows a download area', () => {
    //incomplete since the section is not completed yet
    cy.get('[data-cy=download-section]').should('be.visible');
    cy.get('[data-cy=download-title]').within(($div) => {
      cy.get('span')
        .should('have.class', 'fas')
        .and('have.class', 'fa-mobile-alt');
      cy.get('h2').should('have.text', 'Download');
      cy.get('.tagline')
        .invoke('text')
        .should('contain', 'FeelBack application is available for all');
    });
    cy.get('[data-cy=download-links] a')
      .invoke('text')
      .should('include', 'Google Play');
    cy.get('[data-cy=download-links] a').should('have.attr', 'href');
  });

  it('shows a contact area', () => {
    cy.get('[data-cy=contact-section]').should('be.visible');
    cy.get('[data-cy=contact-name]')
      .invoke('text')
      .should('include', 'Ulm University')
      .and('include', 'Medical Systems Biology');
    cy.get('[data-cy=contact-name] span')
      .should('have.class', 'fas')
      .and('have.class', 'fa-home');
    cy.get('[data-cy=contact-address]')
      .invoke('text')
      .should('include', 'James Franck Ring 1')
      .and('include', '89081 Ulm')
      .and('include', 'Germany');
    cy.get('[data-cy=contact-address] span')
      .should('have.class', 'fas')
      .and('have.class', 'fa-map-marker-alt');
    cy.get('[data-cy=contact-mail]')
      .invoke('text')
      .should('include', 'info@feelback-app.com');
    cy.get('[data-cy=contact-mail] span')
      .should('have.class', 'fas')
      .and('have.class', 'fa-envelope');
    cy.get('[data-cy=contact-mail] a')
      .should('have.attr', 'href')
      .and('include', 'mailto:info@feelback-app.com');
    cy.get('[data-cy=contact-phone]')
      .invoke('text')
      .should('include', '+49 / (0) 731 /')
      .and('include', '50 245 00');
    cy.get('[data-cy=contact-phone] span')
      .should('have.class', 'fas')
      .and('have.class', 'fa-phone-alt');
    cy.get('[data-cy=contact-phone] a')
      .should('have.attr', 'href')
      .and('include', 'tel:');
    cy.get('[data-cy=contact-social-networks] a')
      .eq(0)
      .should('have.attr', 'href')
      .and('include', '#');
    cy.get('[data-cy=contact-social-networks] a span')
      .eq(0)
      .should('have.class', 'fab')
      .and('have.class', 'fa-facebook');
    cy.get('[data-cy=contact-social-networks] a')
      .eq(1)
      .should('have.attr', 'href')
      .and('include', '#');
    cy.get('[data-cy=contact-social-networks] a span')
      .eq(1)
      .should('have.class', 'fab')
      .and('have.class', 'fa-twitter');
  });
});
