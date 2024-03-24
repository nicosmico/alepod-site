describe('02 - Navbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.viewport('iphone-x');
  });

  context('Mobile resolution', () => {
    it('user can not view navbar list', () => {
      cy.getBySel('navbar-toggle').should('have.attr', 'aria-expanded', 'false');
      cy.getBySel('navbar-list').should('have.attr', 'data-visible', 'false');
    });

    it('user can toggle navbar list', () => {
      cy.getBySel('navbar-toggle').click();
      cy.getBySel('navbar-toggle').should('have.attr', 'aria-expanded', 'true');
      cy.getBySel('navbar-list').should('have.attr', 'data-visible', 'true');
    });

    it('user can change section', () => {
      cy.getBySel('navbar-link').each(($link) => {
        cy.getBySel('navbar-toggle').click();
        const href = $link.attr('href');
        cy.get($link).click({ scrollBehavior: 'center' });
        cy.url().should('contain', href);
        cy.get(href);
        cy.get($link).should('have.class', 'active');
      });
    });

    it('user can toggle dark theme', () => {
      cy.getBySel('navbar-toggle').click();
      cy.getBySel('navbar-theme-toggle').click();
      cy.getBySel('navbar-theme-toggle').should('have.attr', 'data-dark', 'true');
      cy.get('body').should('have.class', 'dark');

      cy.getBySel('navbar-toggle').click();
      cy.getBySel('navbar-theme-toggle').click();
      cy.getBySel('navbar-theme-toggle').should('have.attr', 'data-dark', 'false');
      cy.get('body').should('not.have.class', 'dark');
    });
  });

  context('Desktop resolution', () => {
    beforeEach(() => {
      cy.viewport('macbook-11');
    });

    it('user can view navbar list in desktop', () => {
      cy.getBySel('navbar-link').each(($link) => {
        const href = $link.attr('href');
        cy.get($link).click();
        cy.url().should('contain', href);
        cy.get(href);
      });
    });

    it('user can change section', () => {
      cy.getBySel('navbar-link').each(($link) => {
        const href = $link.attr('href');
        cy.get($link).click({ scrollBehavior: 'center' });
        cy.url().should('contain', href);
        cy.get(href);
        cy.get($link).should('have.class', 'active');
      });
    });

    it('user can toggle dark theme', () => {
      cy.getBySel('navbar-theme-toggle').click();
      cy.getBySel('navbar-theme-toggle').should('have.attr', 'data-dark', 'true');
      cy.get('body').should('have.class', 'dark');

      cy.getBySel('navbar-theme-toggle').click();
      cy.getBySel('navbar-theme-toggle').should('have.attr', 'data-dark', 'false');
      cy.get('body').should('not.have.class', 'dark');
    });
  });
});
