import contactData from '../fixtures/contact-data.json';

describe('01 - Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.viewport('iphone-x');
  });

  context('Contact information', () => {
    it('user can view phone number', () => {
      cy.getBySel('header-phone').contains(contactData.formatedPhone);
    });

    it('user can click to Whatsapp button', () => {
      cy.getBySel('contact-whatsapp')
        .should('be.visible')
        .should('not.have.attr', 'href', '#undefined');

      cy.getBySel('contact-whatsapp').then((element) => {
        const href = element.attr('href');
        cy.request(href)
          .should('have.property', 'status', 200);
      });
    });

    it('user can click to call button', () => {
      cy.getBySel('contact-call')
        .should('be.visible')
        .should('not.have.attr', 'href', '#undefined')
        .should('have.attr', 'href', `tel:${contactData.phone}`);
    });
  });

  context('Map', () => {
    it('user can view locations and map', () => {
      // Look for location buttons
      cy.getBySel('location-button').first().should('be.visible');
      cy.getBySel('location-button').first().click({
        scrollBehavior: 'center',
      });

      // Look for a circle in the map
      cy.getBySel('locations-map').get('.leaflet-pane.leaflet-map-pane .leaflet-interactive')
        .should('be.visible');
    });
  });

  context('Reviews', () => {
    it('user can view reviews', () => {
      cy.getBySel('review-card').first().scrollIntoView();
      cy.getBySel('review-card').first().should('be.visible');
    });
  });
});
