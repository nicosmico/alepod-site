import contactData from '../fixtures/contact-data.json';

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

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
