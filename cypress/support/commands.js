// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add('getBySel', (selector, ...args) => cy.get(`[data-test=${selector}]`, ...args));

// Cypress.Commands.add('getBySelLike', (selector, ...args) => {
//     cy.get(`[data-test*=${selector}]`, ...args))
// };
